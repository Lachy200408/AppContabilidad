window.onload = () => {
  startForm();
};

function startForm() {
  const form = document.querySelector("body>form");

  form.addEventListener("submit", submitForm, false);

  setListeners();
}

//* Funciones de handlers

function submitForm(event) {
  event.preventDefault();
  const form = document.querySelector("body>form");

  //* Validar las fechas
  const validacionFecha = validateDate(String(form.fecha.value));
  let errores = Object.values(validacionFecha).filter(
    (message) => message !== "ok"
  );
  if (errores.length !== 0) {
    displayModal(errores.join("\n"));
    return;
  }
  const fecha = String(form.fecha.value);

  //* Validar el detalle
  const validacionDetalle = validateDetail(form.detalle.value);
  errores = Object.values(validacionDetalle).filter(
    (message) => message !== "ok"
  );
  if (errores.length !== 0) {
    displayModal(errores.join("\n"));
    return;
  }
  const detalle = form.detalle.value;

  //* Validar las cuentas con las de la base de datos de la API
  const arrayCuentas = Array.from(
    document.querySelector("body>form>fieldset>ul").children
  ).map((li) => {
    const liArray = Array.from(li.children);
    const cuenta = liArray[0].value;
    const debe = liArray[1].lastElementChild.value;
    const haber = liArray[2].lastElementChild.value;
    const arraySubcuentas = Array.from(liArray[3].children[1].children).map(
      (_li) => {
        const subcuenta = _li.children[0].value;
        const parcial = _li.children[1].firstElementChild.value;

        return {
          subcuenta: subcuenta,
          parcial: parcial,
        };
      }
    );

    return {
      cuenta: cuenta,
      debe: debe,
      haber: haber,
      subcuentas: arraySubcuentas,
    };
  });

  //* Exportar el registro
  const xmlArrayCuentas = arrayCuentas
    .map((_cuenta) => {
      const xmlSubcuentas = _cuenta.subcuentas
        .map((_subcuenta) => {
          return `<subcuenta>
								<nombre>${_subcuenta.subcuenta}</nombre>
								<parcial>${_subcuenta.parcial}</parcial>
							</subcuenta>`;
        })
        .join("");

      return `<cuenta>
							<nombre>${_cuenta.cuenta}</nombre>
							<debe>${_cuenta.debe}</debe>
							<haber>${_cuenta.haber}</haber>
							${xmlSubcuentas}
						</cuenta>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="utf-8"?>
								<tabla>
									<fecha>${fecha}</fecha>
									${xmlArrayCuentas}
									<detalle>${detalle}</detalle>
								</tabla>`;

  console.log("Llega aqui");
  downloadReg(xml);
}

function modifyCuentas(event) {
  event.preventDefault();
  console.log(event.target);

  const isCuenta = !String(event.target.id).includes("Sub");
  const itemKind = isCuenta ? "cuenta" : "subcuenta";

  //* Selecciono el elemento correcto dependiendo del boton
  const list = isCuenta
    ? document.querySelector("body>form>fieldset>ul")
    : event.target.parentElement.children[1];

  //* Html de los items
  const htmlCuenta = `
					<input
						type="text"
						list="cuentas"
						required
						class="col-lg-6 form-control form-text"
					/>
					<label class="form-label text-secondary">
						Debitando:
						<input
							type="number"
							name="debe"
							id="debe"
							placeholder="$0.00"
							step="0.01"
							class="col-md-3 form-control"
						/>
					</label>
					<label class="form-label text-secondary">
						Acreditando:
						<input
							type="number"
							name="haber"
							id="haber"
							placeholder="$0.00"
							step="0.01"
							class="col-md-3 form-control"
						/>
					</label>

					<details class="row-cols-2">
						<summary class="form-text">Subcuentas</summary>
						<ul class="col-12"></ul>

						<button
							name="newSubCuenta"
							id="newSubCuenta"
							class="btn btn-secondary col-2 m-2"
						>
							+
						</button>
						<button
							name="removeSubCuenta"
							id="removeSubCuenta"
							class="btn btn-secondary col-2 m-2"
						>
							-
						</button>
					</details>
	`;
  const htmlSubCuenta = `
		<input type="text" list="subcuentas" required class="form-control"/>

		<label class="form-label">
			Parcial: 
			<input type="number" name="parcial" id="parcial" required class="form-control"/>
		</label>
	`;
  const html = document.createElement("li");
  html.className = itemKind + " list-unstyled";
  html.innerHTML = isCuenta ? htmlCuenta : htmlSubCuenta;

  if (event.target.innerText === "+") {
    list.appendChild(html);
  } else {
    const length = list.children.length;

    //* Desactivar boton cuando queden dos cuentas y 0 subcuentas
    if ((length === 2 && isCuenta) || (length === 0 && !isCuenta)) return;

    list.children[length - 1].remove();
  }

  //* Resetear los listeners
  resetListeners();
}

function handlerBalances(event) {
  const input = event.target;

  if (event.type === "change") {
    if (
      input.value !== "" &&
      !input.value.includes(",") &&
      !input.value.includes(".")
    )
      input.value = String(input.value).concat(",00");
  } else {
    //* Validar entrada
    if (input.value === "") input.value = "";
  }

  //* Resetear el contiguo
  let element = input.parentElement;
  if (element.innerText === "Parcial: ") return;
  element =
    element.innerText === "Acreditando:"
      ? element.previousElementSibling
      : element.nextElementSibling;
  element = element.lastElementChild.value = "";
}

//* Funciones de listeners

function setListeners() {
  //* Colocar listeners de botones
  document.querySelectorAll("fieldset button").forEach((btn) => {
    btn.addEventListener("click", modifyCuentas, false);
  });
  //* Colocar listeners de inputs numericos
  document.querySelectorAll('input[type="number"]').forEach((input) => {
    input.addEventListener("input", handlerBalances, false);
    input.addEventListener("change", handlerBalances, false);
  });
}

function removeListeners() {
  //* Quitar listeners de botones
  document.querySelectorAll("fieldset button").forEach((btn) => {
    btn.removeEventListener("click", modifyCuentas);
  });
  //* Quitar listeners de inputs numericos
  document.querySelectorAll('input[type="number"]').forEach((input) => {
    input.removeEventListener("input", handlerBalances);
  });
}

function resetListeners() {
  removeListeners();
  setListeners();
}

//* Funciones de validacion

function validateDate(fecha) {
  const ymd = fecha.split("-").map((num) => parseInt(num));
  const fechaActual = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  const resultado = {
    year: "",
    month: "",
    day: "",
  };

  if (ymd[0] < 2000 || ymd[0] > fechaActual.year)
    resultado.year = "El año está incorrecto";
  else resultado.year = "ok";

  if (ymd[1] > 12 || ymd[1] < 1 || ymd[1] > fechaActual.month)
    resultado.month = "El mes está incorrecto";
  else resultado.month = "ok";

  if (
    ymd[2] > 31 ||
    ymd[2] < 1 ||
    (ymd[2] > 28 && ymd[1] !== 2) || //* Febrero
    (ymd[2] > 30 && ymd[1] !== 1) ||
    (ymd[2] > 30 && ymd[1] !== 3) ||
    (ymd[2] > 30 && ymd[1] !== 5) ||
    (ymd[2] > 30 && ymd[1] !== 7) ||
    (ymd[2] > 30 && ymd[1] !== 8) ||
    (ymd[2] > 30 && ymd[1] !== 10) ||
    (ymd[2] > 30 && ymd[1] !== 12) ||
    ymd[2] > fechaActual.day
  )
    resultado.day = "El día está incorrecto";
  else resultado.day = "ok";

  return resultado;
}

function validateDetail(detalle) {
  const resultado = {
    malRedaccion: "",
    inconsistencia: "",
  };

  if (detalle.includes("egistrando")) resultado.malRedaccion = "ok";
  else
    resultado.malRedaccion =
      'Los detalles están escritos incorrectamente. Debe iniciar con "Registrando".';

  if (detalle.split(" ").length > 5) resultado.inconsistencia = "ok";
  else resultado.inconsistencia = "Argumenta un poco más los detalles.";

  return resultado;
}

function displayModal(text) {
  alert("Ha ocurrido un problema en su formulario:\n" + text);
}

//* Funciones de exportacion

let cantReg = 1;
function downloadReg(text, fileName = "Sin-titulo") {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  console.log(text);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}${cantReg++}.xml`;
  a.style.display = "none";

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
