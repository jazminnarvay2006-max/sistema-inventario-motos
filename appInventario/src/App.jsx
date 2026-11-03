import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Package, FolderTree, Users, RefreshCw, UserCheck, 
  Bell, Search, Plus, AlertTriangle, Bike, LayoutGrid, List, Edit3, Trash2, X
} from 'lucide-react';

// --- SIDEBAR ---
function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/', label: 'Inicio (Panel de control)', icon: LayoutDashboard },
    { path: '/productos', label: 'Productos (Motos)', icon: Bike },
    { path: '/categorias', label: 'Categorías', icon: FolderTree },
    { path: '/proveedores', label: 'Proveedores', icon: Users },
    { path: '/kardex', label: 'Kardex / Movimientos', icon: RefreshCw },
    { path: '/usuarios', label: 'Usuarios', icon: UserCheck },
  ];

  return (
    <aside style={{
      width: '260px',
      background: 'rgba(15, 23, 42, 0.95)',
      borderRight: '1px solid rgba(56, 189, 248, 0.15)',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem 1rem',
      backdropFilter: 'blur(12px)',
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 0.5rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ background: 'linear-gradient(135deg, #0284c7, #38bdf8)', padding: '0.5rem', borderRadius: '8px' }}>
          <Bike size={22} color="#fff" />
        </div>
        <div>
          <h2 style={{ color: '#f8fafc', fontSize: '1.1rem', margin: 0, fontWeight: '700' }}>SENADO</h2>
          <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Sistema de Inventario Motos</span>
        </div>
      </div>

      <nav style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                color: active ? '#38bdf8' : '#94a3b8',
                background: active ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                borderLeft: active ? '3px solid #38bdf8' : '3px solid transparent',
                textDecoration: 'none',
                fontWeight: active ? '600' : '400',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon size={18} />
              <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

// --- HEADER CON zIndex ALTO PARA LAS NOTIFICACIONES ---
function Header() {
  const [notifAbierto, setNotifAbierto] = useState(false);
  const [notificaciones, setNotificaciones] = useState([
    { id: 1, texto: 'Stock bajo en Kawasaki Ninja 400 (Quedan 2)', hora: 'Hace 10 min' },
    { id: 2, texto: 'Entrada registrada: +5 Pulsar N250', hora: 'Hace 1 hora' },
    { id: 3, texto: 'Nuevo proveedor registrado con éxito', hora: 'Hace 3 horas' }
  ]);

  return (
    <header style={{
      height: '65px',
      background: 'rgba(15, 23, 42, 0.95)',
      borderBottom: '1px solid rgba(56, 189, 248, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      backdropFilter: 'blur(8px)',
      position: 'relative',
      zIndex: 9999 // Asegura que esté por encima de todo el contenido
    }}>
      <div style={{ position: 'relative', width: '320px' }}>
        <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        <input 
          type="text" 
          placeholder="Buscar en el sistema..." 
          style={{
            width: '100%',
            background: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '0.45rem 0.75rem 0.45rem 2.2rem',
            borderRadius: '20px',
            color: '#fff',
            fontSize: '0.85rem',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* BOTÓN CAMPANA */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setNotifAbierto(!notifAbierto)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}
          >
            <Bell size={20} color="#94a3b8" />
            {notificaciones.length > 0 && (
              <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></span>
            )}
          </button>

          {/* DESPLEGABLE DE NOTIFICACIONES */}
          {notifAbierto && (
            <div className="glass-card" style={{
              position: 'absolute',
              right: 0,
              top: '45px',
              width: '320px',
              background: '#0f172a',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '12px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.8)',
              zIndex: 10000,
              padding: '1rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.9rem' }}>Notificaciones</span>
                <button 
                  onClick={() => setNotificaciones([])}
                  style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  Marcar leídas
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '220px', overflowY: 'auto' }}>
                {notificaciones.length === 0 ? (
                  <p style={{ color: '#64748b', fontSize: '0.8rem', textAlign: 'center', margin: '1rem 0' }}>No hay notificaciones nuevas</p>
                ) : (
                  notificaciones.map(n => (
                    <div key={n.id} style={{ background: 'rgba(30, 41, 59, 0.9)', padding: '0.6rem', borderRadius: '8px', borderLeft: '3px solid #38bdf8' }}>
                      <p style={{ color: '#f8fafc', fontSize: '0.8rem', margin: '0 0 4px 0' }}>{n.texto}</p>
                      <span style={{ color: '#64748b', fontSize: '0.7rem' }}>{n.hora}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '1.25rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #0284c7, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>
            J
          </div>
          <div style={{ fontSize: '0.85rem' }}>
            <div style={{ color: '#f8fafc', fontWeight: '600' }}>Jazmín Narvay</div>
            <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Administrador</div>
          </div>
        </div>
      </div>
    </header>
  );
}

// --- 1. DASHBOARD COMPLETO ---
function DashboardView() {
  const movimientosRecientes = [
    { id: 1, fecha: '28 Oct 2026', producto: 'Pulsar N250 FI ABS', tipo: 'Entrada', cant: '+5', usuario: 'Almacenero' },
    { id: 2, fecha: '28 Oct 2026', producto: 'Yamaha MT-07 ABS', tipo: 'Salida', cant: '-1', usuario: 'Admin' },
    { id: 3, fecha: '28 Oct 2026', producto: 'Kawasaki Ninja 400', tipo: 'Entrada', cant: '+2', usuario: 'Almacenero' },
  ];

  return (
    <div style={{ padding: '2rem', position: 'relative', zIndex: 1 }}>
      <h1 style={{ color: '#f8fafc', fontSize: '1.6rem', marginBottom: '1.5rem' }}>Dashboard / Panel Principal</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '12px' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Total Motos</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#f8fafc', margin: '0.5rem 0' }}>142</div>
          <span style={{ color: '#34d399', fontSize: '0.75rem' }}>+8% este mes</span>
        </div>
        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '12px' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Categorías</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#f8fafc', margin: '0.5rem 0' }}>5</div>
          <span style={{ color: '#818cf8', fontSize: '0.75rem' }}>Activas</span>
        </div>
        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '12px' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Proveedores</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#f8fafc', margin: '0.5rem 0' }}>4</div>
          <span style={{ color: '#c084fc', fontSize: '0.75rem' }}>Marcas Oficiales</span>
        </div>
        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(248, 113, 113, 0.4)' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Alertas Stock</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#f87171', margin: '0.5rem 0' }}>3</div>
          <span style={{ color: '#f87171', fontSize: '0.75rem' }}>Requieren atención</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '12px' }}>
          <h3 style={{ color: '#f8fafc', fontSize: '1.1rem', marginBottom: '1rem' }}>Movimientos Recientes (Kardex)</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#64748b' }}>
                <th style={{ padding: '0.75rem' }}>Fecha</th>
                <th>Modelo Moto</th>
                <th>Tipo</th>
                <th>Cantidad</th>
                <th>Usuario</th>
              </tr>
            </thead>
            <tbody>
              {movimientosRecientes.map((m) => (
                <tr key={m.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#cbd5e1' }}>
                  <td style={{ padding: '0.75rem' }}>{m.fecha}</td>
                  <td style={{ fontWeight: '500', color: '#fff' }}>{m.producto}</td>
                  <td>
                    <span style={{
                      padding: '0.2rem 0.6rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      background: m.tipo === 'Entrada' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(248, 113, 113, 0.15)',
                      color: m.tipo === 'Entrada' ? '#34d399' : '#f87171'
                    }}>
                      {m.tipo}
                    </span>
                  </td>
                  <td style={{ fontWeight: '600', color: m.tipo === 'Entrada' ? '#34d399' : '#f87171' }}>{m.cant}</td>
                  <td>{m.usuario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h3 style={{ color: '#f8fafc', fontSize: '1.1rem', marginBottom: '1.5rem', width: '100%' }}>Stock por Categoría</h3>
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'conic-gradient(#38bdf8 0% 40%, #818cf8 40% 65%, #c084fc 65% 85%, #f472b6 85% 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: '#0f172a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>142</span>
              <span style={{ fontSize: '0.65rem', color: '#64748b' }}>Total Motos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 2. PRODUCTOS ---
function ProductosView() {
  const [vistaGrid, setVistaGrid] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idActual, setIdActual] = useState(null);

  const [productos, setProductos] = useState([
    { id: '001', nombre: 'Pulsar N250 FI ABS', marca: 'BAJAJ / PULSAR', categoria: 'Naked / Pista', precioNum: 13800, precio: 'S/ 13,800.00', precioLista: 'S/ 14,500.00', stock: 12, imagen: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80' },
    { id: '002', nombre: 'Kawasaki Ninja 400 KRT', marca: 'KAWASAKI', categoria: 'Deportiva / Pista', precioNum: 29900, precio: 'S/ 29,900.00', precioLista: 'S/ 31,500.00', stock: 2, imagen: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80' }
  ]);

  const [formData, setFormData] = useState({ nombre: '', marca: 'YAMAHA', categoria: 'Deportiva / Pista', precio: '', stock: '', imagenUrl: '' });

  const handleEliminar = (id) => {
    if (window.confirm('¿Eliminar esta motocicleta?')) setProductos(productos.filter(p => p.id !== id));
  };

  const handleEditar = (p) => {
    setModoEdicion(true);
    setIdActual(p.id);
    setFormData({ nombre: p.nombre, marca: p.marca, categoria: p.categoria, precio: p.precioNum, stock: p.stock, imagenUrl: p.imagen });
    setModalAbierto(true);
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    const valPrecio = parseFloat(formData.precio);
    let imgFinal = formData.imagenUrl.trim() || 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80';

    if (modoEdicion) {
      setProductos(productos.map(p => p.id === idActual ? { ...p, nombre: formData.nombre, marca: formData.marca, categoria: formData.categoria, precioNum: valPrecio, precio: `S/ ${valPrecio.toFixed(2)}`, stock: parseInt(formData.stock), imagen: imgFinal } : p));
    } else {
      const nuevo = { id: `00${productos.length + 1}`, nombre: formData.nombre, marca: formData.marca, categoria: formData.categoria, precioNum: valPrecio, precio: `S/ ${valPrecio.toFixed(2)}`, precioLista: `S/ ${(valPrecio * 1.08).toFixed(2)}`, stock: parseInt(formData.stock), imagen: imgFinal };
      setProductos([nuevo, ...productos]);
    }
    setModalAbierto(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ color: '#f8fafc', fontSize: '1.6rem', margin: 0 }}>Catálogo de Motocicletas</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '4px 0 0 0' }}>Gestión visual de inventario</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button onClick={() => setVistaGrid(true)} style={{ background: vistaGrid ? '#0284c7' : 'rgba(30,41,59,0.7)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}><LayoutGrid size={15} /></button>
          <button onClick={() => setVistaGrid(false)} style={{ background: !vistaGrid ? '#0284c7' : 'rgba(30,41,59,0.7)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}><List size={15} /></button>
          
          <button 
            onClick={() => { setModoEdicion(false); setFormData({nombre:'', marca:'YAMAHA', categoria:'Deportiva / Pista', precio:'', stock:'', imagenUrl:''}); setModalAbierto(true); }} 
            style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}
          >
            <Plus size={18} /> Nueva Motocicleta
          </button>
        </div>
      </div>

      {vistaGrid ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {productos.map(p => (
            <div key={p.id} className="glass-card" style={{ borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
              <div style={{ position: 'relative', height: '160px', background: '#000' }}>
                <img src={p.imagen} alt={p.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#0f172a', color: '#38bdf8', padding: '2px 8px', borderRadius: '8px', fontSize: '0.75rem' }}>ID: {p.id}</span>
                <span style={{ position: 'absolute', top: '10px', right: '10px', background: p.stock <= 3 ? '#ef4444' : '#10b981', color: '#fff', padding: '2px 8px', borderRadius: '8px', fontSize: '0.75rem' }}>Stock: {p.stock}</span>
              </div>
              <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ color: '#818cf8', fontSize: '0.75rem', fontWeight: 'bold' }}>{p.marca}</span>
                  <h3 style={{ color: '#fff', margin: '4px 0' }}>{p.nombre}</h3>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{p.categoria}</span>
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem' }}>
                  <span style={{ color: '#38bdf8', fontSize: '1.1rem', fontWeight: 'bold' }}>{p.precio}</span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => handleEditar(p)} style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }}><Edit3 size={14} /></button>
                    <button onClick={() => handleEliminar(p.id)} style={{ background: 'rgba(248, 113, 113, 0.2)', color: '#f87171', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }}><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '12px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#64748b', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>ID</th><th>Modelo</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '10px' }}>{p.id}</td><td>{p.nombre}</td><td>{p.categoria}</td><td style={{ color: '#38bdf8' }}>{p.precio}</td><td>{p.stock}</td>
                  <td>
                    <button onClick={() => handleEditar(p)} style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', border: 'none', padding: '4px 8px', borderRadius: '4px', marginRight: '5px', cursor: 'pointer' }}>Editar</button>
                    <button onClick={() => handleEliminar(p.id)} style={{ background: 'rgba(248, 113, 113, 0.2)', color: '#f87171', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalAbierto && (
        <div style={{ position: 'fixed', top:0, left:0, right:0, bottom:0, background: 'rgba(15,23,42,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div className="glass-card" style={{ width: '400px', padding: '2rem', borderRadius: '16px' }}>
            <h3>{modoEdicion ? 'Editar Motocicleta' : 'Nueva Motocicleta'}</h3>
            <form onSubmit={handleGuardar} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1rem' }}>
              <input type="text" placeholder="Modelo" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} required style={{ padding: '8px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              <input type="number" placeholder="Precio S/" value={formData.precio} onChange={e => setFormData({...formData, precio: e.target.value})} required style={{ padding: '8px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              <input type="number" placeholder="Stock" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required style={{ padding: '8px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              <input type="text" placeholder="URL Imagen (Opcional)" value={formData.imagenUrl} onChange={e => setFormData({...formData, imagenUrl: e.target.value})} style={{ padding: '8px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                <button type="button" onClick={() => setModalAbierto(false)} style={{ flex: 1, padding: '8px', background: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer' }}>Cancelar</button>
                <button type="submit" style={{ flex: 1, padding: '8px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 3. CATEGORÍAS ---
function CategoriasView() {
  const [categorias, setCategorias] = useState([
    { id: '001', nombre: 'Naked / Street', desc: 'Motos urbanas sin carenado' },
    { id: '002', nombre: 'Deportiva / Pista', desc: 'Diseño aerodinámico' }
  ]);
  const [modal, setModal] = useState(false);
  const [edicion, setEdicion] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [form, setForm] = useState({ nombre: '', desc: '' });

  const eliminar = (id) => setCategorias(categorias.filter(c => c.id !== id));
  const editar = (c) => { setEdicion(true); setIdEdit(c.id); setForm({ nombre: c.nombre, desc: c.desc }); setModal(true); };
  const guardar = (e) => {
    e.preventDefault();
    if (edicion) {
      setCategorias(categorias.map(c => c.id === idEdit ? {...c, nombre: form.nombre, desc: form.desc} : c));
    } else {
      setCategorias([...categorias, { id: `00${categorias.length + 1}`, nombre: form.nombre, desc: form.desc }]);
    }
    setModal(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ color: '#fff', margin: 0 }}>Categorías de Motos</h1>
        <button onClick={() => { setEdicion(false); setForm({nombre:'', desc:''}); setModal(true); }} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer' }}>+ Nueva Categoría</button>
      </div>
      <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', fontSize: '0.85rem' }}>
          <thead><tr style={{ color: '#64748b', textAlign: 'left' }}><th style={{ padding: '10px' }}>ID</th><th>Nombre</th><th>Descripción</th><th>Acciones</th></tr></thead>
          <tbody>
            {categorias.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '10px' }}>{c.id}</td><td>{c.nombre}</td><td>{c.desc}</td>
                <td>
                  <button onClick={() => editar(c)} style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', border: 'none', padding: '4px 8px', borderRadius: '4px', marginRight: '5px', cursor: 'pointer' }}>Editar</button>
                  <button onClick={() => eliminar(c.id)} style={{ background: 'rgba(248, 113, 113, 0.2)', color: '#f87171', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <div style={{ position: 'fixed', top:0, left:0, right:0, bottom:0, background: 'rgba(15,23,42,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div className="glass-card" style={{ width: '380px', padding: '2rem', borderRadius: '16px' }}>
            <h3>{edicion ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
            <form onSubmit={guardar} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1rem' }}>
              <input type="text" placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required style={{ padding: '8px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              <input type="text" placeholder="Descripción" value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} required style={{ padding: '8px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                <button type="button" onClick={() => setModal(false)} style={{ flex: 1, background: 'transparent', color: '#94a3b8', border: 'none' }}>Cancelar</button>
                <button type="submit" style={{ flex: 1, background: '#0284c7', color: '#fff', border: 'none', padding: '8px', borderRadius: '6px' }}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 4. PROVEEDORES ---
function ProveedoresView() {
  const [provs, setProvs] = useState([{ id: '001', razon: 'Yamaha Motor Perú', tel: '987654321', email: 'ventas@yamaha.pe' }]);
  const [modal, setModal] = useState(false);
  const [edicion, setEdicion] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [form, setForm] = useState({ razon: '', tel: '', email: '' });

  const eliminar = (id) => setProvs(provs.filter(p => p.id !== id));
  const editar = (p) => { setEdicion(true); setIdEdit(p.id); setForm({ razon: p.razon, tel: p.tel, email: p.email }); setModal(true); };
  const guardar = (e) => {
    e.preventDefault();
    if (edicion) {
      setProvs(provs.map(p => p.id === idEdit ? {...p, razon: form.razon, tel: form.tel, email: form.email} : p));
    } else {
      setProvs([...provs, { id: `00${provs.length + 1}`, razon: form.razon, tel: form.tel, email: form.email }]);
    }
    setModal(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ color: '#fff', margin: 0 }}>Proveedores Oficiales</h1>
        <button onClick={() => { setEdicion(false); setForm({razon:'', tel:'', email:''}); setModal(true); }} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer' }}>+ Nuevo Proveedor</button>
      </div>
      <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', fontSize: '0.85rem' }}>
          <thead><tr style={{ color: '#64748b', textAlign: 'left' }}><th style={{ padding: '10px' }}>ID</th><th>Razón Social</th><th>Teléfono</th><th>Email</th><th>Acciones</th></tr></thead>
          <tbody>
            {provs.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '10px' }}>{p.id}</td><td>{p.razon}</td><td>{p.tel}</td><td style={{ color: '#38bdf8' }}>{p.email}</td>
                <td>
                  <button onClick={() => editar(p)} style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', border: 'none', padding: '4px 8px', borderRadius: '4px', marginRight: '5px', cursor: 'pointer' }}>Editar</button>
                  <button onClick={() => eliminar(p.id)} style={{ background: 'rgba(248, 113, 113, 0.2)', color: '#f87171', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <div style={{ position: 'fixed', top:0, left:0, right:0, bottom:0, background: 'rgba(15,23,42,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div className="glass-card" style={{ width: '380px', padding: '2rem', borderRadius: '16px' }}>
            <h3>{edicion ? 'Editar Proveedor' : 'Nuevo Proveedor'}</h3>
            <form onSubmit={guardar} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1rem' }}>
              <input type="text" placeholder="Razón Social" value={form.razon} onChange={e => setForm({...form, razon: e.target.value})} required style={{ padding: '8px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              <input type="text" placeholder="Teléfono" value={form.tel} onChange={e => setForm({...form, tel: e.target.value})} required style={{ padding: '8px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required style={{ padding: '8px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                <button type="button" onClick={() => setModal(false)} style={{ flex: 1, background: 'transparent', color: '#94a3b8', border: 'none' }}>Cancelar</button>
                <button type="submit" style={{ flex: 1, background: '#0284c7', color: '#fff', border: 'none', padding: '8px', borderRadius: '6px' }}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 5. KARDEX ---
function KardexView() {
  const [movimientos, setMovimientos] = useState([{ id: '001', fecha: '28 Oct 2026', moto: 'Pulsar N250', tipo: 'Entrada', cant: '+5' }]);
  const [modal, setModal] = useState(false);
  const [edicion, setEdicion] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [form, setForm] = useState({ moto: '', tipo: 'Entrada', cant: '' });

  const eliminar = (id) => setMovimientos(movimientos.filter(m => m.id !== id));
  const editar = (m) => { setEdicion(true); setIdEdit(m.id); setForm({ moto: m.moto, tipo: m.tipo, cant: m.cant }); setModal(true); };
  const guardar = (e) => {
    e.preventDefault();
    if (edicion) {
      setMovimientos(movimientos.map(m => m.id === idEdit ? {...m, moto: form.moto, tipo: form.tipo, cant: form.cant} : m));
    } else {
      setMovimientos([{ id: `00${movimientos.length + 1}`, fecha: '28 Oct 2026', moto: form.moto, tipo: form.tipo, cant: form.cant }, ...movimientos]);
    }
    setModal(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ color: '#fff', margin: 0 }}>Kardex / Movimientos</h1>
        <button onClick={() => { setEdicion(false); setForm({moto:'', tipo:'Entrada', cant:''}); setModal(true); }} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer' }}>+ Registrar Movimiento</button>
      </div>
      <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', fontSize: '0.85rem' }}>
          <thead><tr style={{ color: '#64748b', textAlign: 'left' }}><th style={{ padding: '10px' }}>ID</th><th>Fecha</th><th>Modelo Moto</th><th>Tipo</th><th>Cantidad</th><th>Acciones</th></tr></thead>
          <tbody>
            {movimientos.map(m => (
              <tr key={m.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '10px' }}>{m.id}</td><td>{m.fecha}</td><td>{m.moto}</td>
                <td><span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem', background: m.tipo === 'Entrada' ? 'rgba(52,211,153,0.2)' : 'rgba(248,113,113,0.2)', color: m.tipo === 'Entrada' ? '#34d399' : '#f87171' }}>{m.tipo}</span></td>
                <td style={{ fontWeight: 'bold', color: m.tipo === 'Entrada' ? '#34d399' : '#f87171' }}>{m.cant}</td>
                <td>
                  <button onClick={() => editar(m)} style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', border: 'none', padding: '4px 8px', borderRadius: '4px', marginRight: '5px', cursor: 'pointer' }}>Editar</button>
                  <button onClick={() => eliminar(m.id)} style={{ background: 'rgba(248, 113, 113, 0.2)', color: '#f87171', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <div style={{ position: 'fixed', top:0, left:0, right:0, bottom:0, background: 'rgba(15,23,42,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div className="glass-card" style={{ width: '380px', padding: '2rem', borderRadius: '16px' }}>
            <h3>{edicion ? 'Editar Movimiento' : 'Registrar Movimiento'}</h3>
            <form onSubmit={guardar} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1rem' }}>
              <input type="text" placeholder="Modelo de Moto" value={form.moto} onChange={e => setForm({...form, moto: e.target.value})} required style={{ padding: '8px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              <select value={form.tipo} onChange={e => setForm({...form, tipo: e.target.value})} style={{ padding: '8px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }}>
                <option value="Entrada">Entrada</option>
                <option value="Salida">Salida</option>
              </select>
              <input type="text" placeholder="Cantidad (ej: +3 o -2)" value={form.cant} onChange={e => setForm({...form, cant: e.target.value})} required style={{ padding: '8px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                <button type="button" onClick={() => setModal(false)} style={{ flex: 1, background: 'transparent', color: '#94a3b8', border: 'none' }}>Cancelar</button>
                <button type="submit" style={{ flex: 1, background: '#0284c7', color: '#fff', border: 'none', padding: '8px', borderRadius: '6px' }}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 6. USUARIOS ---
function UsuariosView() {
  const [usuarios, setUsuarios] = useState([{ id: '001', nombre: 'Jazmín Narvay', email: 'jnarvay@senati.pe', rol: 'Administrador' }]);
  const [modal, setModal] = useState(false);
  const [edicion, setEdicion] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [form, setForm] = useState({ nombre: '', email: '', rol: 'Almacenero' });

  const eliminar = (id) => setUsuarios(usuarios.filter(u => u.id !== id));
  const editar = (u) => { setEdicion(true); setIdEdit(u.id); setForm({ nombre: u.nombre, email: u.email, rol: u.rol }); setModal(true); };
  const guardar = (e) => {
    e.preventDefault();
    if (edicion) {
      setUsuarios(usuarios.map(u => u.id === idEdit ? {...u, nombre: form.nombre, email: form.email, rol: form.rol} : u));
    } else {
      setUsuarios([...usuarios, { id: `00${usuarios.length + 1}`, nombre: form.nombre, email: form.email, rol: form.rol }]);
    }
    setModal(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ color: '#fff', margin: 0 }}>Usuarios y Roles</h1>
        <button onClick={() => { setEdicion(false); setForm({nombre:'', email:'', rol:'Almacenero'}); setModal(true); }} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer' }}>+ Nuevo Usuario</button>
      </div>
      <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', fontSize: '0.85rem' }}>
          <thead><tr style={{ color: '#64748b', textAlign: 'left' }}><th style={{ padding: '10px' }}>ID</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Acciones</th></tr></thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '10px' }}>{u.id}</td><td>{u.nombre}</td><td style={{ color: '#38bdf8' }}>{u.email}</td><td>{u.rol}</td>
                <td>
                  <button onClick={() => editar(u)} style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', border: 'none', padding: '4px 8px', borderRadius: '4px', marginRight: '5px', cursor: 'pointer' }}>Editar</button>
                  <button onClick={() => eliminar(u.id)} style={{ background: 'rgba(248, 113, 113, 0.2)', color: '#f87171', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <div style={{ position: 'fixed', top:0, left:0, right:0, bottom:0, background: 'rgba(15,23,42,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div className="glass-card" style={{ width: '380px', padding: '2rem', borderRadius: '16px' }}>
            <h3>{edicion ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
            <form onSubmit={guardar} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1rem' }}>
              <input type="text" placeholder="Nombre completo" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required style={{ padding: '8px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              <input type="email" placeholder="Correo electrónico" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required style={{ padding: '8px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }} />
              <select value={form.rol} onChange={e => setForm({...form, rol: e.target.value})} style={{ padding: '8px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }}>
                <option value="Administrador">Administrador</option>
                <option value="Almacenero">Almacenero</option>
                <option value="Supervisor">Supervisor</option>
              </select>
              <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                <button type="button" onClick={() => setModal(false)} style={{ flex: 1, background: 'transparent', color: '#94a3b8', border: 'none' }}>Cancelar</button>
                <button type="submit" style={{ flex: 1, background: '#0284c7', color: '#fff', border: 'none', padding: '8px', borderRadius: '6px' }}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --- APP PRINCIPAL ---
export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a' }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<DashboardView />} />
              <Route path="/productos" element={<ProductosView />} />
              <Route path="/categorias" element={<CategoriasView />} />
              <Route path="/proveedores" element={<ProveedoresView />} />
              <Route path="/kardex" element={<KardexView />} />
              <Route path="/usuarios" element={<UsuariosView />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}