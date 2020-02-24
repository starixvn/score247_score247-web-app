import appSettings from "../../app-settings";

export const widgetLanguages: { [key: string]: string } = {
  en: "en",
  vi: "vi",
  id: "id",
  th: "th",
  zhTW: "zht",
  zhCN: "zh"
};

export function initializeWidget(language: string) {
  const script = document.createElement("script");
  script.async = true;
  script.innerHTML = `(function(a,b,c,d,e,f,g,h,i){a[e]||(i=a[e]=function(){(a[e].q=a[e].q||[]).push(arguments)},i.l=1*new Date,i.o=f,
        g=b.createElement(c),h=b.getElementsByTagName(c)[0],g.async=1,g.src=d,g.setAttribute("n",e),h.parentNode.insertBefore(g,h)
        )})(window,document,"script","https://widgets.sir.sportradar.com/${appSettings.sportRadarWidgetKey}/widgetloader","SIR", {
            language: '${widgetLanguages[language]}'
        });`;

  document.body.appendChild(script);
}

export function changeWidgetLanguage(language: string) {
  const script = document.createElement("script");
  script.async = true;
  script.innerHTML = `SIR('changeLanguage','${widgetLanguages[language]}')`;
  document.body.appendChild(script);
}
