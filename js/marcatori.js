document.addEventListener('DOMContentLoaded', () => {
    caricaMarcatori();
});

async function caricaMarcatori() {
    try {
        const response = await fetch('dati/marcatori.json');
        const marcatori = await response.json();

        marcatori.sort((a, b) => b.gol - a.gol);

        const tbody = document.getElementById('corpo-marcatori');
        tbody.innerHTML = '';

        marcatori.forEach((p, index) => {
            const riga = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${p.nome}</td>
                    <td>${p.squadra}</td>
                    <td><strong>${p.gol}</strong></td>
                    <td>${p.assist}</td>
                    <td>${p.ammonizioni}</td>
                    <td>${p.espulsioni}</td>
                </tr>
            `;
            tbody.innerHTML += riga;
        });
    } catch (error) {
        console.error("Errore nel caricamento dei marcatori:", error);
        document.getElementById('corpo-marcatori').innerHTML = '<tr><td colspan="7">Errore nel caricamento dati.</td></tr>';
    }
}
