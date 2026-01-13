const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwWhj2_O6tZ3UyYarL04Hu3gxMhUu5QGt6qTPhPAo9EB3NQdtm6H0_LfW0XgYECDu0u4A/exec";

function inviaLibretto() {
  const file = document.getElementById("libretto").files[0];
  if (!file) {
    alert("Seleziona una foto del libretto");
    return;
  }

  const reader = new FileReader();
  reader.onload = async () => {
    const base64 = reader.result.split(",")[1];

    const res = await fetch(WEB_APP_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "ocrLibretto",
        base64: base64,
        nomeFile: file.name
      })
    }).then(r => r.json());

    document.getElementById("log").textContent =
      JSON.stringify(res, null, 2);

    if (!res.ok) {
      alert("Completa i dati manualmente");
    }
  };

  reader.readAsDataURL(file);
}

async function conferma() {
  const dati = {
    nomeCliente: nomeCliente.value,
    veicolo: veicolo.value,
    targa: targa.value,
    motore: motore.value
  };

  const res = await fetch(WEB_APP_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "confermaManuale",
      dati: dati
    })
  }).then(r => r.json());

  document.getElementById("log").textContent =
    JSON.stringify(res, null, 2);

  if (res.ok) {
    alert("Cliente e veicolo salvati");
  }
}

