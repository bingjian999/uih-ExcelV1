(function(){let e=`https://cdn.jsdelivr.net/pyodide/v0.27.7/full/`,t=null,n=null;async function r(){return t||n||(n=(async()=>{try{let n=await(await import(`${e}pyodide.mjs`)).loadPyodide({indexURL:e});return t=n,n}catch(e){let t=e instanceof Error?e.message:String(e);throw Error(`Failed to load Pyodide from jsDelivr. Check internet access and Content-Security-Policy allowlists for https://cdn.jsdelivr.net. Original error: ${t}`)}finally{t||(n=null)}})(),n)}function i(e){let t=new Set,n=e.split(`
`);for(let e of n){let n=e.trim(),r=/^import\s+([\w.]+)/.exec(n);if(r){let e=r[1].split(`.`)[0];e&&t.add(e)}let i=/^from\s+([\w.]+)\s+import/.exec(n);if(i){let e=i[1].split(`.`)[0];e&&t.add(e)}}let r=new Set(`sys.os.io.re.json.math.csv.datetime.collections.itertools.functools.operator.string.textwrap.unicodedata.struct.copy.pprint.typing.types.abc.enum.dataclasses.pathlib.tempfile.shutil.glob.hashlib.hmac.secrets.base64.binascii.html.xml.email.urllib.http.logging.warnings.traceback.time.calendar.random.statistics.decimal.fractions.threading.multiprocessing.subprocess.signal.socket.ssl.select.sqlite3.dbm.gzip.bz2.zipfile.tarfile.lzma.zlib.unittest.doctest.argparse.configparser.getopt.ctypes.array.weakref.gc.inspect.dis.ast.code.codeop.pickle.shelve.marshal.platform.sysconfig.site.numpy.np.pandas.pd.scipy.matplotlib.mpl.plt.seaborn.sns.sklearn.scikit_learn.PIL.Pillow.lxml.bs4.beautifulsoup4.pyodide.micropip.js`.split(`.`));return[...t].filter(e=>!r.has(e))}async function a(e){let t=performance.now(),n=await r(),a=Math.round(performance.now()-t),o=``,s=``;e.packages&&e.packages.length>0&&await n.loadPackage(e.packages);let c=i(e.code);if(c.length>0)try{await n.loadPackage(`micropip`);let e=c.map(e=>`"${e}"`).join(`, `);await n.runPythonAsync(`
import micropip
try:
    await micropip.install([${e}])
except Exception:
    pass
`)}catch{}e.inputJson?(n.globals.set(`__input_json__`,e.inputJson),await n.runPythonAsync(`
import json as __json__
input_data = __json__.loads(__input_json__)
del __input_json__
`)):await n.runPythonAsync(`input_data = None`),await n.runPythonAsync(`
import sys as __sys__
import io as __io__
__stdout_capture__ = __io__.StringIO()
__stderr_capture__ = __io__.StringIO()
__sys__.stdout = __stdout_capture__
__sys__.stderr = __stderr_capture__
result = None
`);let l=performance.now();try{await n.runPythonAsync(e.code)}catch(t){await n.runPythonAsync(`
__sys__.stdout = __sys__.__stdout__
__sys__.stderr = __sys__.__stderr__
`).catch(()=>{});try{let e=await n.runPythonAsync(`__stdout_capture__.getvalue()`);o=e==null?``:`${e}`}catch{}try{let e=await n.runPythonAsync(`__stderr_capture__.getvalue()`);s=e==null?``:`${e}`}catch{}let r=t instanceof Error?t.message:String(t);return{id:e.id,ok:!1,stdout:o||void 0,stderr:s||void 0,error:r,loadTimeMs:a,runTimeMs:Math.round(performance.now()-l)}}let u=Math.round(performance.now()-l);try{let e=await n.runPythonAsync(`__stdout_capture__.getvalue()`);o=e==null?``:`${e}`}catch{}try{let e=await n.runPythonAsync(`__stderr_capture__.getvalue()`);s=e==null?``:`${e}`}catch{}let d;try{let e=await n.runPythonAsync(`
import json as __json__
__result_json__ = __json__.dumps(result) if result is not None else None
__result_json__
`);e!=null&&(d=`${e}`)}catch{}await n.runPythonAsync(`
__sys__.stdout = __sys__.__stdout__
__sys__.stderr = __sys__.__stderr__
`).catch(()=>{});try{n.globals.delete(`__stdout_capture__`),n.globals.delete(`__stderr_capture__`),n.globals.delete(`__result_json__`)}catch{}return{id:e.id,ok:!0,stdout:o||void 0,stderr:s||void 0,resultJson:d,loadTimeMs:a,runTimeMs:u}}self.addEventListener(`message`,e=>{let t=e.data;a(t).then(e=>self.postMessage(e),e=>{let n=e instanceof Error?e.message:String(e),r={id:t.id,ok:!1,error:`Worker error: ${n}`};self.postMessage(r)})})})();