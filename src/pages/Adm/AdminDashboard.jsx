import { Users, PlusCircle, Search, Map, Clock, ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { todosMemoriais } from '../../data/sampleData';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
    const ultimosCadastros = todosMemoriais.slice(0, 3);

    return (
        <div className={styles.adminLayout}>
            <AdminSidebar />

            <main className={styles.mainContent}>
                <div className={styles.container}>
                    <header className={styles.header}>
                        <h1 className={styles.title}>Olá, Administrador </h1>
                        <p className={styles.subtitle}>Bem-vindo ao sistema de gestão do Cemitério São Miguel.</p>
                    </header>

                    {/* --- CARDS DE RESUMO --- */}
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statIcon} style={{ background: '#e6f0ff', color: '#0066cc' }}>
                                <Users size={28} />
                            </div>
                            <div className={styles.statInfo}>
                                <h3>{todosMemoriais.length}</h3>
                                <p>Memoriais Cadastrados</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.dashboardGrid}>
                        {/* --- ATALHOS RÁPIDOS --- */}
                        <section className={styles.quickActions}>
                            <h2 className={styles.title}>Ações Rápidas</h2>
                            <div className={styles.actionsGrid}>
                                <Link to="/admin/memoriais" className={styles.actionButton}>
                                    <PlusCircle size={32} className={styles.actionIcon} />
                                    <span>Novo Memorial</span>
                                    <p>Cadastrar um novo falecido</p>
                                </Link>

                                <Link to="/admin/memoriais" className={styles.actionButton}>
                                    <Search size={32} className={styles.actionIcon} />
                                    <span>Buscar Registro</span>
                                    <p>Localizar setor e lote</p>
                                </Link>

                                <Link to="/mapa" target="_blank" className={styles.actionButton}>
                                    <Map size={32} className={styles.actionIcon} />
                                    <span>Ver Mapa</span>
                                    <p>Abrir mapa do cemitério</p>
                                </Link>
                            </div>
                        </section>

                        {/* --- ÚLTIMOS CADASTROS (AGORA EM TABELA) --- */}
                        <section className={styles.recentActivity}>
                            <div className={styles.recentHeader}>
                                <h2 className={styles.title}>Últimos Cadastros</h2>
                                <Link to="/admin/memoriais" className={styles.viewAllLink}>
                                    Ver todos <ArrowRight size={16} />
                                </Link>
                            </div>

                            <div className={styles.tableContainer}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Nome do Falecido</th>
                                            <th>Localização</th>
                                            <th>Registro</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ultimosCadastros.map(memorial => (
                                            <tr key={memorial.id}>
                                                <td className={styles.nameCell}>
                                                    <div className={styles.avatar}>
                                                        <img src={memorial.imagem} alt={memorial.nome} />
                                                    </div>
                                                    <div className={styles.nameInfo}>
                                                        <span className={styles.name}>{memorial.nome}</span>
                                                        <span className={styles.dates}>{memorial.anoNascimento} — {memorial.anoMorte}</span>
                                                    </div>
                                                </td>
                                                <td className={styles.locationCell}>
                                                    <span className={styles.locationContent}>
                                                        <MapPin size={16} className={styles.pinIcon} />
                                                        {memorial.localizacao}
                                                    </span>
                                                </td>
                                                <td className={styles.timeCell}>
                                                    <span className={styles.timeContent}>
                                                        <Clock size={16} className={styles.clockIcon} />
                                                        Recentemente
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}