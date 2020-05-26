const subscript = /_(?!{)(.+?)(?:_|(\^|$| ))/g
const superscript = /\^(?!{)(.+?)(?:\^|(_|$| ))/g

window.onload = function(e) {
    loadJS(
        "https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/katex.min.js",
        function() {
            rerender_all();
        },
        document.body
    );

    let customCSS = document.createElement("style");
    customCSS.innerHTML = `.notion-frame span .katex {
            padding-right: 0 !important;
            font-size: 1.3em;
        }`;
    document.getElementsByTagName("head")[0].appendChild(customCSS);
};

var loadJS = function(url, implementationCode, location) {
    //url is URL of external file, implementationCode is the code
    //to be called from the file, location is the location to
    //insert the <script> element

    var scriptTag = document.createElement("script");
    scriptTag.src = url;

    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;

    location.appendChild(scriptTag);
};

function rerender_all(e) {
    document.querySelectorAll("body").innerHTML = "";
    var code = document.querySelectorAll('span[style*="monospace"]');
    code.forEach(function(el) {
        if (document.activeElement.contains(el)) {
            if (!e.altKey) {  //"F2" !e.altKey e.key != "F2"
                return;
            }
        }
        var s = el.textContent;
        if (s.startsWith("$") && s.endsWith("$")) { //
            el.style.color = null;
            el.style.background = null;
            s = s.substring(1, s.length-1) //
            // s = s.slice(5).trim();
            console.log("rendering ", s) 
            katex.render(s, el, {throwOnError: true, font: "mathit"});
        } else if (s.startsWith(",")) {
            el.style.color = null;
            el.style.background = null;
            s = "\\mathrm{" + s.slice(1).trim() + "}";

            var match;
            while (match = s.match(subscript)) {
                s = s.replace(subscript, "_{$1}$2");
            }
          
            while (match = s.match(superscript)) {
                s = s.replace(superscript, "^{$1}$2");
            }        

            katex.render(s, el, {throwOnError: true, font: "mathit"});
        }
    });
}

function rerender() {
    rerender_all({key: "discard"});
    setTimeout(rerender, 500);
}
setTimeout(rerender, 5000);

window.addEventListener("mousedown", rerender_all);
window.addEventListener("keydown", rerender_all, true);
