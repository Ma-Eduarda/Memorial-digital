import { useState } from 'react';
import { MapPin, Navigation, Info, Layers, ZoomIn, ZoomOut } from 'lucide-react';
import Button from '../components/Button';
import { personalidadesImportantes, memoriaisRecentes } from '../data/sampleData';
import styles from './MapPage.module.css';

export default function MapPage() {
    const [selectedSector, setSelectedSector] = useState(null);

    const sectors = [
        { id: 'A', name: 'Setor A', type: 'historicos', count: 45, x: 73, y: 95 },
        { id: 'B', name: 'Setor B', type: 'historicos', count: 38, x: 62, y: 75 },
        { id: 'C', name: 'Setor C', type: 'mistos', count: 52, x: 55, y: 60 },
        { id: 'D', name: 'Setor D', type: 'recentes', count: 120, x: 49, y: 48 },
        { id: 'E', name: 'Setor E', type: 'recentes', count: 95, x: 42, y: 30 },
        { id: 'F', name: 'Setor F', type: 'novos', count: 180, x: 35, y: 10 },
    ];

    const memoriaisNoSetor = selectedSector
        ? memoriaisRecentes.filter((m) => m.localizacao?.includes(`Setor ${selectedSector}`))
        : [];

    return (
        <div className={styles.page}>
            <header className={styles.heroBanner}>
                <div className={styles.container}>
                    <h1>Mapa do Cemitério</h1>
                    <p>Explore os setores, localize quadras e encontre memoriais rapidamente.</p>
                </div>
            </header>

            {/* Conteúdo Principal */}
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.layout}>
                        
                        {/* Área do Mapa */}
                        <div className={styles.mapWrapper}>
                            <div className={styles.map}>
                                <div className={styles.mapImage}>
                                    <img
                                        src="src/assets/mapaExemplo.png?auto=compress&cs=tinysrgb&w=1200"
                                        alt="Vista aérea do Cemitério"
                                    />
                                    <div className={styles.mapOverlay} />
                                </div>

                                {/* Pinos dos Setores */}
                                {sectors.map((sector) => (
                                    <button
                                        key={sector.id}
                                        className={`${styles.sectorPin} ${selectedSector === sector.id ? styles.sectorActive : ''}`}
                                        style={{ left: `${sector.x}%`, top: `${sector.y}%` }}
                                        onClick={() => setSelectedSector(selectedSector === sector.id ? null : sector.id)}
                                    >
                                        <span>{sector.id}</span>
                                        <div className={styles.sectorTooltip}>
                                            <strong>{sector.name}</strong>
                                            <span>{sector.count} memoriais</span>
                                        </div>
                                    </button>
                                ))}

                                {/* Controles do Mapa */}
                                <div className={styles.mapControls}>
                                    <button title="Ampliar"><ZoomIn size={20} /></button>
                                    <button title="Diminuir"><ZoomOut size={20} /></button>
                                    <button title="Camadas"><Layers size={20} /></button>
                                    <button title="Minha Localização"><Navigation size={20} /></button>
                                </div>
                            </div>
                        </div>

                        {/* Painel de Informações Lateral */}
                        <div className={styles.infoPanel}>
                            {selectedSector ? (
                                <div className={styles.sectorInfo}>
                                    <div className={styles.sectorHeader}>
                                        <div className={styles.sectorIconWrapper}>
                                            <MapPin className={styles.sectorIcon} size={28} />
                                        </div>
                                        <div>
                                            <h3>Setor {selectedSector}</h3>
                                            <span>{sectors.find(s => s.id === selectedSector)?.count} sepultamentos encontrados</span>
                                        </div>
                                    </div>
                                    
                                    <div style={{ marginTop: '24px' }}>
                                        <Button variant="primary" icon={<Navigation size={18} />} style={{ width: '100%', justifyContent: 'center' }}>
                                            Traçar Rota até o Setor
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.defaultInfo}>
                                    <Info className={styles.defaultIcon} size={40} />
                                    <h3>Como Navegar</h3>
                                    <ul>
                                        <li>Clique em um <strong>setor no mapa</strong> (A, B, C...) para ver os detalhes da área.</li>
                                        <li>Use os botões de <strong>zoom</strong> no canto do mapa para aproximar a imagem.</li>
                                        <li>Ative sua <strong>localização</strong> para se guiar dentro do cemitério.</li>
                                    </ul>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}