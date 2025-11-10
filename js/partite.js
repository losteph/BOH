document.addEventListener('DOMContentLoaded', () => {
    caricaPartite();
});

async function caricaPartite() {
    try {
        const response = await fetch('dati/partite.json');
        const partite = await response.json();

        const container = document.getElementById('calendario-completo');
        container.innerHTML = '';

        let currentGiornata = 0;
        let giornataHtml = '';

        partite.forEach(partita => {
            if (partita.giornata !== currentGiornata) {
                if (currentGiornata !== 0) {
                    container.innerHTML += giornataHtml; 
                }
                currentGiornata = partita.giornata;
                giornataHtml = `<h3>Giornata ${currentGiornata}</h3>`;
            }

            const risultato = partita.status === 'giocata' 
                ? `${partita.golCasa} - ${partita.golOspite}` 
                : 'vs';

            let dateTimeHtml = '';
            if (partita.data && partita.ora) {
                dateTimeHtml = `
                    <div class="match-datetime">
                        <span>${partita.data}</span>
                        <span>${partita.ora}</span>
                    </div>
                `;
            }

            giornataHtml += `
                <div class="match">
                    <div class="match-info">
                        <span class="match-squadra" style="text-align: right;">${partita.squadraCasa}</span>
                        <span class="match-risultato">${risultato}</span>
                        <span class="match-squadra" style="text-align: left;">${partita.squadraOspite}</span>
                    </div>
                    ${dateTimeHtml}
                </div>
            `;
        });

        container.innerHTML += giornataHtml;

    } catch (error)
        {
        console.error("Errore nel caricamento delle partite:", error);
        container.innerHTML = '<p>Errore nel caricamento del calendario.</p>';
    }
}
