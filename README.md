# 🌍 CountriesQuiz – Lernspiel zum Länder Erraten
**Technologien**: JavaScript, HTML, CSS, Three.js, Globe.Gl

**Beschreibung**:
CountriesQuiz ist ein interaktives Lernspiel, bei dem Nutzer spielerisch Länder auf einer 3D-Weltkarte erkennen und erraten können. Mit Hilfe von Three.js wird eine drehbare Weltkugel dargestellt. Beim Spiel erscheinen Länder , und der Spieler muss das entsprechende Land auf der Karte anklicken

**Ziel**:
Geografie-Wissen spielerisch erweitern, besonders für Schüler und Lernende, die sich visuell orientieren

#  Installationsbefehl
Um die Projektumgebung für das Projekt mit Webpack aufzubauen, führt man im Terminal folgendes Kommando aus

```bash
npm install webpack webpack-cli webpack-dev-server webpack-merge clean-webpack-plugin copy-webpack-plugin @babel/core @babel/preset-env babel-loader css-loader file-loader html-loader html-webpack-plugin mini-css-extract-plugin portfinder-sync raw-loader style-loader ip --save-dev
```

 
| Paket                  | Beschreibung                                                                                                         |
|------------------------|----------------------------------------------------------------------------------------------------------------------|
| `webpack`              | Der Haupt-Bundler. Liest deine Abhängigkeitsstruktur (JS, CSS, Bilder, etc.) und erstellt daraus optimierte Bundles. |
| `webpack-cli`          | Befehlzeilenwerkzeuge für Webpack, damit du z.B. `npx webpack` ausführen kannst.                                     |
| `webpack-dev-server`   | Startet einen lokalen Entwicklungsserver mit Hot Module Replacement (HMR), Auto-Reload und schnellerem Build.        |
| `webpack-merge`        | Erlaubt das modulare Kombinieren von mehreren Webpack-Konfigurationen (z.B. für Entwicklung und Produktion).         |
| `clean-webpack-plugin` | Löscht automatisch den Ausgabeordner (z.B. `dist`) vor jedem neuen Build.                                            |
| `copy-webpack-plugin`  | Kopiert statische Dateien (z.B. Bilder, Fonts, etc.) vom Quellverzeichnis ins Ausgabeziel.                           |
| `@babel/core`       | Kernbibliothek von Babel – wandelt modernen JS-Code in abwärtskompatiblen Code um. |
| `@babel/preset-env` | Babel-Preset für moderne JS-Features (ES6+), basierend auf der Zielumgebung.       |
| `babel-loader`      | Webpack-Loader, der Babel verwendet, um JS-Dateien zu transpilen.                  |
| `css-loader`              | Interpretiert `@import` und `url()` in CSS-Dateien und integriert sie in das JavaScript. |
| `style-loader`            | Fügt CSS über `<style>`-Tags direkt ins HTML ein .         |
| `mini-css-extract-plugin` | Extrahiert CSS in eigene `.css`-Dateien .                      |
| `file-loader`         | Kopiert Dateien (z.B. Bilder, Fonts) in den Ausgabeordner und gibt URLs zurück (in neueren Webpack-Versionen ersetzt durch `asset/resource`). |
| `raw-loader`          | Importiert Dateien als rohe Zeichenkette – z.B. HTML, SVG, Textdateien.                                                                       |
| `html-loader`         | Läd HTML-Dateien als Module – ermöglicht z.B. das Parsen von `<img src="">`.                                                                  |
| `html-webpack-plugin` | Generiert automatisch eine HTML-Datei, in die alle Bundles eingebunden werden.      
| `portfinder-sync` | Findet automatisch einen freien Port für den Entwicklungsserver – nützlich bei dynamischer Konfiguration.        |
| `ip`              | Hilfsmodul zum Ermitteln der lokalen IP-Adresse – z.B. um den Dev-Server über das Netzwerk erreichbar zu machen. |
| --save-dev       | speichert die installierten Pakete in devDependencies in der package.json |

# Startbefehl:
```bash
npm run start
```
# Code
| **JS-Datei**      | **Beschreibung**                                                    |
| ----------------- | ------------------------------------------------------------------- |
| `index.js`        | Zentrale Datei zur Erstellung des Globus und Steuerung des Menüs.   |
| `flag.js`         | Zuständig für das Laden und Darstellen der Länderflaggen.           |
| `gamelogic.js`    | Enthält die Spiellogik für den Play-Modus.                          |
| `getStarfield.js` | Erzeugt den Sternenhintergrund.                                     |
| `map.js`          | Stellt die gesamte Weltkarte mit Beschriftungen im Learn-Modus dar. |
| `options.js`      | Implementiert die Filterfunktionen im Options-Modus.                |
| `tooltip.js`      | Verwaltet die Anzeige von Labels und Tooltips.                      | 


# Quellen:
- [Globe.GL Doku](https://globe.gl/)
- [Tutorial WebPack](https://www.youtube.com/watch?v=fqHx8_U2eKU&list=PLEXzUhnWfEhgTVL_r3_njztkZdeQGNJCR&index=3)
- [Tutorial Globe](https://www.youtube.com/watch?v=f4zncVufL_I)
- [Code für Sterne](https://github.com/bobbyroe/3d-globe-with-threejs/blob/main/src/getStarfield.js)
- [Flags Material](https://www.countryflags.com/)
- [GeoJson Datei](https://geojson-maps.kyd.au/)
- [ISO-A2 Countries](https://www.ble.de/SharedDocs/Downloads/EN/Climate-Energy/Information-Nabisy/CountryCodes.pdf?__blob=publicationFile&v=1)
  
  



