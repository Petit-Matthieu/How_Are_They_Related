import { useState, useRef, useEffect } from "react";
import { datasets, categories, type Dataset } from "./data";
import { pearson, getStrength, getDirection, getColor, getEmoji, linearRegression } from "./utils";

type View = "home" | "detail" | "custom";

function App() {
  const [view, setView] = useState<View>("home");
  const [selected, setSelected] = useState<Dataset | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [customX, setCustomX] = useState("");
  const [customY, setCustomY] = useState("");
  const [customXLabel, setCustomXLabel] = useState("X");
  const [customYLabel, setCustomYLabel] = useState("Y");
  const [customResult, setCustomResult] = useState<Dataset | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const filtered = filter ? datasets.filter(d => d.category === filter) : datasets;

  // Draw scatter chart
  useEffect(() => {
    const ds = view === "custom" ? customResult : selected;
    if (!ds || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const pad = { top: 20, right: 20, bottom: 40, left: 50 };
    const cw = w - pad.left - pad.right;
    const ch = h - pad.top - pad.bottom;

    const minX = Math.min(...ds.x);
    const maxX = Math.max(...ds.x);
    const minY = Math.min(...ds.y);
    const maxY = Math.max(...ds.y);
    const rangeX = maxX - minX || 1;
    const rangeY = maxY - minY || 1;

    const toCanvasX = (v: number) => pad.left + ((v - minX) / rangeX) * cw;
    const toCanvasY = (v: number) => pad.top + ch - ((v - minY) / rangeY) * ch;

    ctx.clearRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = "rgba(148, 163, 184, 0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (ch / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
    }

    // Axes labels
    ctx.fillStyle = "#64748b";
    ctx.font = "11px system-ui";
    ctx.textAlign = "center";
    for (let i = 0; i <= 4; i++) {
      const val = minY + (rangeY / 4) * (4 - i);
      ctx.fillText(val.toFixed(1), pad.left - 8, pad.top + (ch / 4) * i + 4, pad.left - 4);
    }
    for (let i = 0; i <= 4; i++) {
      const val = minX + (rangeX / 4) * i;
      ctx.fillText(val.toFixed(1), pad.left + (cw / 4) * i, h - pad.bottom + 16);
    }

    // Axis titles
    ctx.fillStyle = "#94a3b8";
    ctx.font = "12px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(ds.xLabel, w / 2, h - 5);
    ctx.save();
    ctx.translate(12, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(ds.yLabel, 0, 0);
    ctx.restore();

    // Trend line
    const reg = linearRegression(ds.x, ds.y);
    const r = pearson(ds.x, ds.y);
    ctx.strokeStyle = getColor(r);
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    const x1 = minX, x2 = maxX;
    ctx.moveTo(toCanvasX(x1), toCanvasY(reg.slope * x1 + reg.intercept));
    ctx.lineTo(toCanvasX(x2), toCanvasY(reg.slope * x2 + reg.intercept));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    // Points
    const color = getColor(r);
    ds.x.forEach((xi, i) => {
      const cx = toCanvasX(xi);
      const cy = toCanvasY(ds.y[i]);
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.8;
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.globalAlpha = 1;
    });
  }, [view, selected, customResult]);

  const handleCustomCalc = () => {
    const xArr = customX.split(/[,，\s]+/).map(Number).filter(n => !isNaN(n));
    const yArr = customY.split(/[,，\s]+/).map(Number).filter(n => !isNaN(n));
    if (xArr.length < 2 || yArr.length < 2 || xArr.length !== yArr.length) return;
    setCustomResult({
      id: "custom", name: "自定义数据", description: `${customXLabel} vs ${customYLabel}`,
      category: "自定义", xLabel: customXLabel, yLabel: customYLabel,
      x: xArr, y: yArr, funFact: "这是你自己的数据！"
    });
  };

  const openDetail = (ds: Dataset) => {
    setSelected(ds);
    setView("detail");
    window.scrollTo(0, 0);
  };

  const r = view === "custom" && customResult ? pearson(customResult.x, customResult.y)
    : selected ? pearson(selected.x, selected.y) : 0;
  const ds = view === "custom" ? customResult : selected;

  // Leaderboard sorted by |r|
  const leaderboard = [...datasets]
    .map(d => ({ ...d, r: pearson(d.x, d.y) }))
    .sort((a, b) => Math.abs(b.r) - Math.abs(a.r));

  return (
    <div className="app">
      {/* Header */}
      <header>
        <h1>🔗 How Are They Related?</h1>
        <p className="subtitle">探索任意两件事之间的相关系数</p>
      </header>

      {/* Home */}
      {view === "home" && (
        <>
          {/* Custom input */}
          <section className="card">
            <h2>✏️ 自定义数据分析</h2>
            <div className="custom-grid">
              <div>
                <label>X 轴标签</label>
                <input value={customXLabel} onChange={e => setCustomXLabel(e.target.value)} placeholder="如：温度" />
              </div>
              <div>
                <label>Y 轴标签</label>
                <input value={customYLabel} onChange={e => setCustomYLabel(e.target.value)} placeholder="如：销量" />
              </div>
            </div>
            <div className="custom-grid">
              <div>
                <label>X 数据（逗号分隔）</label>
                <textarea value={customX} onChange={e => setCustomX(e.target.value)} rows={2} placeholder="1, 2, 3, 4, 5" />
              </div>
              <div>
                <label>Y 数据（逗号分隔）</label>
                <textarea value={customY} onChange={e => setCustomY(e.target.value)} rows={2} placeholder="2, 4, 5, 4, 5" />
              </div>
            </div>
            <button className="btn" onClick={handleCustomCalc}>计算相关系数</button>
            {customResult && (
              <div className="custom-result" onClick={() => setView("custom")}>
                <span>r = <strong style={{ color: getColor(r) }}>{r.toFixed(4)}</strong></span>
                <span>{getEmoji(r)} {getStrength(r)} {getDirection(r)}</span>
                <button className="btn-small" onClick={(e) => { e.stopPropagation(); setView("custom"); }}>查看详情 →</button>
              </div>
            )}
          </section>

          {/* Category filter */}
          <div className="filters">
            <button className={`chip ${!filter ? "active" : ""}`} onClick={() => setFilter(null)}>全部</button>
            {categories.map(c => (
              <button key={c} className={`chip ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
            ))}
          </div>

          {/* Dataset grid */}
          <div className="grid">
            {filtered.map(d => {
              const dr = pearson(d.x, d.y);
              return (
                <div key={d.id} className="card clickable" onClick={() => openDetail(d)}>
                  <div className="card-header">
                    <span className="category-tag">{d.category}</span>
                    <span className="r-value" style={{ color: getColor(dr) }}>
                      r = {dr.toFixed(2)}
                    </span>
                  </div>
                  <h3>{d.name}</h3>
                  <p className="desc">{d.description}</p>
                </div>
              );
            })}
          </div>

          {/* Leaderboard */}
          <section className="card">
            <h2>🏆 相关系数排行榜</h2>
            <div className="leaderboard">
              {leaderboard.map((d, i) => (
                <div key={d.id} className="lb-row" onClick={() => openDetail(d)}>
                  <span className="lb-rank">{i < 3 ? ["🥇","🥈","🥉"][i] : `#${i+1}`}</span>
                  <span className="lb-name">{d.name}</span>
                  <span className="lb-bar">
                    <span style={{ width: `${Math.abs(d.r)*100}%`, background: getColor(d.r) }} />
                  </span>
                  <span className="lb-val" style={{ color: getColor(d.r) }}>
                    {d.r >= 0 ? "+" : ""}{d.r.toFixed(4)}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Info */}
          <section className="card info-card">
            <h2>📚 相关系数是什么？</h2>
            <div className="info-grid">
              <div><strong>+1</strong> 正相关：一个增加，另一个也增加</div>
              <div><strong>0</strong> 无线性关系</div>
              <div><strong>-1</strong> 负相关：一个增加，另一个减少</div>
            </div>
            <p className="warn">⚠️ 相关性 ≠ 因果性！两个变量相关不代表一个导致了另一个。</p>
          </section>
        </>
      )}

      {/* Detail view */}
      {(view === "detail" || view === "custom") && ds && (
        <>
          <button className="btn-back" onClick={() => { setView("home"); setSelected(null); setCustomResult(null); }}>← 返回</button>

          <div className="detail-header">
            <h2>{ds.name}</h2>
            <p>{ds.description}</p>
          </div>

          <div className="detail-grid">
            {/* Gauge */}
            <div className="card">
              <div className="gauge">
                <div className="gauge-value" style={{ color: getColor(r) }}>
                  {r >= 0 ? "+" : ""}{r.toFixed(4)}
                </div>
                <div className="gauge-label">{getEmoji(r)} {getStrength(r)} {getDirection(r)}</div>
                <div className="gauge-bar">
                  <div className="gauge-track" />
                  <div className="gauge-fill" style={{
                    width: `${Math.abs(r) * 100}%`,
                    background: getColor(r),
                    marginLeft: r >= 0 ? "50%" : undefined,
                    marginRight: r < 0 ? "50%" : undefined,
                  }} />
                  <div className="gauge-center" />
                </div>
                <div className="gauge-range">
                  <span>-1</span><span>0</span><span>+1</span>
                </div>
              </div>
              <div className="fun-fact">💡 {ds.funFact}</div>
            </div>

            {/* Chart */}
            <div className="card">
              <canvas ref={canvasRef} style={{ width: "100%", height: 320 }} />
              <p className="chart-equation">
                趋势线: y = {linearRegression(ds.x, ds.y).slope.toFixed(2)}x + {linearRegression(ds.x, ds.y).intercept.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Data table */}
          <details className="card">
            <summary>📋 查看原始数据</summary>
            <table>
              <thead><tr><th>#</th><th>{ds.xLabel}</th><th>{ds.yLabel}</th></tr></thead>
              <tbody>
                {ds.x.map((xi, i) => (
                  <tr key={i}><td>{i+1}</td><td>{xi}</td><td>{ds.y[i]}</td></tr>
                ))}
              </tbody>
            </table>
          </details>
        </>
      )}

      {/* Footer */}
      <footer>
        <p>⚠️ 相关性 ≠ 因果性 | Built with React + TypeScript</p>
      </footer>
    </div>
  );
}

export default App;
