import React from 'react';

export default function Dashboard() {
    return (
        <div style={{ padding: '2rem' }}>
            <h1 className="neon-glow" style={{ color: '#38bdf8' }}>Panel de Control - Sistema de Inventario</h1>
            <p style={{ color: '#94a3b8' }}>Bienvenida al dashboard principal con diseño moderno.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '12px' }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#38bdf8' }}>Productos Totales</h3>
                    <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold' }}>--</p>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '12px' }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#38bdf8' }}>Categorías</h3>
                    <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold' }}>--</p>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '12px' }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#38bdf8' }}>Movimientos Kardex</h3>
                    <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold' }}>--</p>
                </div>
            </div>
        </div>
    );
}