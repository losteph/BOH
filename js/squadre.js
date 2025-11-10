document.addEventListener('DOMContentLoaded', () => {
    caricaSquadre();
});

async function caricaSquadre() {
    try {
        const response = await fetch('dati/squadre.json');
        const squadre = await response.json();

        const container = document.getElementById('elenco-squadre');
        container.innerHTML = '';

        squadre.forEach(squadra => {
            let giocatoriHtml = '<ul>';
            squadra.rosa.forEach(giocatore => {
                giocatoriHtml += `<li>${giocatore.nome} <em>(${giocatore.ruolo})</em></li>`;
            });
            giocatoriHtml += '</ul>';

            const squadraHtml = `
                <div class="squadra-card">
                    <h3>${squadra.nome}</h3>
                    ${giocatoriHtml}
                </div>
            `;
            container.innerHTML += squadraHtml;
        });
    } catch (error) {
        console.error("Errore nel caricamento delle squadre:", error);
        document.getElementById('elenco-squadre').innerHTML = '<p>Errore nel caricamento dati.</p>';
    }
}
