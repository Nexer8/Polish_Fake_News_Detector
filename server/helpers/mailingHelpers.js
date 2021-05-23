const inlineCSS = require("inline-css");

module.exports = {
  buildMailHtml: (reportId, statement, verdict, comment) => {
    const template = `
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
        
        .wrapper {
            padding: 30px;
            font-size: 14px;
            font-family: 'Source Sans Pro', sans-serif;
            color: hsl(0, 0%, 82%);
            background-color: hsl(220, 9%, 13%);
        }
        
        p.box {
            background-color: hsl(232, 8%, 20%);
            padding: 7px 11px;
            border-radius: 4px;
        }

        h1, h2 {
            font-family: 'Playfair Display', serif;
            font-weight: normal;
            margin: 0;
        }
        
        h1 {
            font-size: 24px;
        }
        
        h2 {
            font-size: 18px;
        }    
        </style>

        <div class="wrapper">
        <h1>Odpowiedź na zgłoszenie #${reportId}</h1>

        </br>

        <p>Drogi Użytkowniku,</p>
        <p>nasz Zespół Edytorski przyjął Twoje zgłoszenie i je rozpatrzył. Poniżej widnieje wypowiedź, która została zgłoszona oraz rezultat procesu szczegółowej weryfikacji.</p>
        
        </br>

        <h2>Zgłaszana wypowiedź</h2>
        <p class="box">${statement}</p>

        </br>

        <h2>Werdykt edytorski</h2>
        <p class="box">${verdict}</p>

        </br>

        <h2>Komentarz edytorski</h2>
        <p class="box">${comment}</p>  

        </br>

        <p>Dziękujemy za zaufanie!</p>
        </div>
    `;

    const html = inlineCSS(template, { url: "fake" });

    return html;
  },
};
