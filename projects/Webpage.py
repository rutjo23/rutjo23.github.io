"""Generate a standalone offline classifier using Python standard library only.
Run: python build_offline.py
Then double-click RemarksLab_Offline.html.
"""
from pathlib import Path
import re
BASE = Path(__file__).resolve().parent
root = BASE / 'assets'
html=(root/'index.html').read_text(encoding="utf-8")
css=re.sub(r'@import\s+url\([^;]+;','',(root/'style.css').read_text(encoding="utf-8"))
classifier=(root/'classifier.mjs').read_text(encoding="utf-8").replace('export function','function')
app=(root/'app.mjs').read_text(encoding="utf-8").replace("import {classify,tokenize} from './classifier.mjs';",'')
app=app.replace("const response=await fetch('./model.json');if(!response.ok)throw Error('Model unavailable');model=await response.json();", "model=JSON.parse(document.getElementById('embedded-model').textContent);")
html=html.replace('<link rel="stylesheet" href="style.css">','<style>'+css+'</style>')
html=html.replace('WORKSPACE <span>/</span> TEXT ANALYTICS','OFFLINE <span>/</span> TEXT ANALYTICS')
html=html.replace('Your sentence stays in this browser. No prediction API.','Works offline. Your sentence stays in this browser.')
html=html.replace('The site serves learned aggregate word counts only.','This offline file contains learned aggregate word counts only.')
model=(root/'model.json').read_text(encoding="utf-8").replace('<','\\u003c')
script=classifier+'\n'+app
html=html.replace('<script type="module" src="app.mjs"></script>', '<script id="embedded-model" type="application/json">'+model+'</script>\n<script>\n'+script+'\n</script>')
(BASE / 'RemarksLab_Offline1.html').write_text(html,encoding='utf-8')

print('Created standalone HTML:',len(html.encode()),'bytes')
