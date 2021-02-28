# FinanceTracker (working title)

An Electron application being developed for the Full Stack Open course project at University of Helsinki: https://github.com/fullstack-hy2020/misc/blob/master/harjoitustyo.md Afterwards the plan is to continue development as an open source project since the application replaces my Excel-based workflow of tracking my personal finances.

## Käyttöohjeet

Harjoitustyön palautusta varten tehty julkaisu löytyy [täältä](https://github.com/ToniOjala/FinanceTracker/releases/tag/0.5.0). Työaikakirjanpito on [täällä](https://github.com/ToniOjala/FinanceTracker/blob/master/tuntikirjanpito.md)

Sovellus on työkalu henkilökohtaisten tulojen ja menojen seurantaan. Alkuun päästääkseen pitää luoda Settings-välilehdellä uusia tulo- ja menokategorioita. Settings-välilehdellä on
myös mahdollista poistaa/muokata kategorioita.

Tämän jälkeen on mahdollista lisätä kategorioille tuloja ja menoja Month-välilehdellä: Income- ja Expense-taulukoissa näkyviä kategorioita pystyy valitsemaan, jolloin kolmannessa taulukossa näytetään valitulle kategoriolle lisätyt tapahtumat ja taulukon alla olevasta New - napista voi lisätä uusia tapahtumia. Valitsemalla tapahtuman voi sen myös poistaa tai muokata Month-välilehti aukeaa automaattisesti nykyiseen kuukauteen ja vuoteen. Kuukauden ja vuoden voi vaihtaa klikkaamalla sovelluksen yläpalkissa näytettävää kuukautta ja vuotta.

Year-välilehdellä näytetään kokonaisen vuoden tapahtumien yhteissummat kategorioittain. Vuoden voi vaihtaa yläpalkista.

Recurring-välilehdellä voi luoda kuukausittain ja vuosittain toistuvia menoja. Toistuvat menot ja niille määritetyt ilmoitukset prosessoidaan sovelluksen käynnistyksen yhteydessä silloin, kun niiden eräpäivät ovat. (Tai niiden jälkeen, jos sovellusta ei käynnistetä juuri sinä päivänä)

Balances-välilehdellä näytetään jokaisen menokategorian saldo ja taulukosta valitun kategorian saldohistoria. Saldo ja sen historia päivittyy sitä mukaa, kun kategorialle lisätään menoja tai tuloa lisättäessä määritetään kulukategorialle saldon lisäystä. Add Balance - napista on myös mahdollista lisätä/vähentää saldoa manuaalisesti.