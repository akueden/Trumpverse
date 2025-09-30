Rapport

Applikasjonen er strukturert rundt flere sider, hver med spesifikke funksjoner for å opprette, oppdatere, slette og søke etter innlegg/thoughts. 

Funksjonalitet
På hjemmesiden vises en liste over alle innlegg ved hjelp av ThoughtList-komponenten. Denne henter data fra backend via ThoughtService og presenterer innholdet på en oversiktlig måte. På registreringssiden kan brukere opprette nye innlegg med tittel, innhold, bilde og kategori. RegisterThought-komponenten håndterer skjemaet, og Context API brukes for å sende data til backend via funksjonen postThought i ThoughtService. Brukeren får visuell tilbakemelding ved vellykket registrering eller feil.
«Manage your posts»-siden lar brukere oppdatere eksisterende innlegg eller slette dem. UpdateDeleteThought-komponenten håndterer oppdaterings- og slettingsfunksjonaliteten ved å bruke funksjonene putThought og deleteThought fra Context API. Brukeren får meldinger som bekrefter vellykkede handlinger eller varsler om feil.
Søkesiden lar brukere søke etter innlegg basert på Id eller kategori. SearchThought-komponenten kommuniserer med Context API for å hente relevante tanker ved bruk av funksjonene getThoughtById eller getThoughtByCategory. Resultater vises dynamisk, og brukeren får beskjed hvis søket mislykkes.

Teknikker
-	Routing: Jeg bruker React Router for navigasjon mellom sidene som håndteres i AppRouting.tsx.
-	API-integrasjon: for kommunikasjon med backend som håndteres gjennom ThoughtService, hvor HTTP-metodene GET, POST, PUT og DELETE brukes for å utføre CRUD-operasjoner på backend. Videre har jeg brukt Axios i ThoughtService for å håndtere API-kall til backend. 
-	React Context API: Jeg bruker Context API til å håndtere tilstanden for thoughts og gjøre HTTP-kall til backend via Axios i samarbeid med ThoughtService, som for eksempel POST med postThought.
-	TypeScript interfaces: I blant annet Ithought og IThoughtContext definerer jeg grensesnittet for informasjon i et innlegg.
-	React hooks: jeg har tatt i bruk hooks som useState, useContext, og useEffect. UseState håndterer brukerinput og oppdatering av brukergrensesnittet. UseContext brukes i Context API for å dele data og funksjoner mellom komponenter. UseEffect utfører handlinger som henter data fra backend eller oppdaterer tilstanden. I RegisterThought bruker jeg blant annet useEffect til å hente eksisterende innlegg fra backend.
-	Modularisering: Koden min er delt opp i mindre og gjenbrukbare komponenter som for eksempel ThoughtItem og ThoughtList.
-	Filhåndtering: Brukeren kan laste opp bilder som en del av et innlegg. Bildet lagres i en file-state, pakkes inn i et FormData-objekt og sendes til backend via Axios. Videre blir bildet lagret i wwwroot på backend.

Universell Utforming 
For å oppfylle kravene til universell utforming har jeg sørget for at nettsiden er forståelig og brukervennlig. Nettsiden min har en enkel og intuitiv struktur som gjør navigasjonen brukervennlig. Jeg har valgt en mørk blå bakgrunnsfarge med hvit tekst for å sikre god lesbarhet, takket være den sterke kontrasten mellom fargene. For å gjøre nettsiden mer forståelig har jeg brukt semantiske HTML-elementer som <h1> og <section>. <h1> markerer hovedoverskriften, mens <section> organiserer innholdet i logiske grupper.
Nettsiden er responsiv, slik at den ser bra ut og fungerer optimalt uavhengig av enhet. I tillegg har jeg implementert tydelig brukerrespons, som visuell tilbakemelding ved hovering og klikk på knapper, samt informative meldinger ved riktige eller feil handlinger. 

