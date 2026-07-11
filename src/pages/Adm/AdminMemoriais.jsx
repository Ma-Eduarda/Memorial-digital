import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, MapPin, X, QrCode, ChevronLeft, ChevronRight } from 'lucide-react';
import QRCode from 'react-qr-code';
import { todosMemoriais } from '../../data/sampleData';
import AdminSidebar from './AdminSidebar';
import styles from './AdminMemoriais.module.css';

const ITEMS_PER_PAGE = 10;

export default function AdminMemoriais() {
    const [memoriais, setMemoriais] = useState(todosMemoriais);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    const [selectedMemorial, setSelectedMemorial] = useState(null);

    const [formData, setFormData] = useState({
        nome: '', anoNascimento: '', anoMorte: '', dataNascimento: '', dataMorte: '',
        descricao: '', biografia: '', imagem: '', localizacao: '', tipo: 'historica', mensagemFamilia: ''
    });

    // --- FILTRAGEM ---
    const filteredMemoriais = memoriais.filter(memorial =>
        memorial.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // --- PAGINAÇÃO ---
    const totalPages = Math.max(1, Math.ceil(filteredMemoriais.length / ITEMS_PER_PAGE));
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentMemoriais = filteredMemoriais.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const saveMemorial = async (e) => {
        e.preventDefault();
        if (selectedMemorial) {
            setMemoriais(memoriais.map(m => m.id === selectedMemorial.id ? { ...formData, id: m.id } : m));
        } else {
            const novo = { ...formData, id: Date.now().toString(), data: new Date().toLocaleDateString('pt-BR') };
            setMemoriais([novo, ...memoriais]);
        }
        closeFormModal();
    };

    const deleteMemorial = async (id, nome) => {
        if (window.confirm(`Tem certeza que deseja excluir permanentemente o memorial de ${nome}?`)) {
            setMemoriais(memoriais.filter(m => m.id !== id));

            if (currentMemoriais.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        }
    };

    // --- CONTROLES DE MODAL ---
    const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const openEditModal = (memorial) => {
        setSelectedMemorial(memorial);
        setFormData(memorial);
        setIsFormModalOpen(true);
    };

    const closeFormModal = () => {
        setSelectedMemorial(null);
        setFormData({
            nome: '', anoNascimento: '', anoMorte: '', dataNascimento: '', dataMorte: '',
            descricao: '', biografia: '', imagem: '', localizacao: '', tipo: 'historica', mensagemFamilia: ''
        });
        setIsFormModalOpen(false);
    };

    const openQrModal = (memorial) => {
        setSelectedMemorial(memorial);
        setIsQrModalOpen(true);
    };

    const qrCodeUrl = selectedMemorial ? `${window.location.origin}/memorial/${selectedMemorial.id}` : '';

    return (
        <div className={styles.adminLayout}>
            <AdminSidebar />

            <main className={styles.mainContent}>
                <div className={styles.container}>
                    <header className={styles.header}>
                        <div>
                            <h1 className={styles.title}>Painel Administrativo</h1>
                            <p className={styles.subtitle}>Gerencie registros, biografias e gere QR Codes.</p>
                        </div>
                        <button className={styles.addButton} onClick={() => setIsFormModalOpen(true)}>
                            <Plus size={20} />
                            Novo Memorial
                        </button>
                    </header>

                    <div className={styles.card}>
                        <div className={styles.toolbar}>
                            <div className={styles.searchBox}>
                                <Search size={18} className={styles.searchIcon} />
                                <input
                                    type="text"
                                    placeholder="Buscar memorial..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Nome do Falecido</th>
                                        <th>Localização</th>
                                        <th>Tipo</th>
                                        <th className={styles.actionsColumn}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentMemoriais.map(memorial => (
                                        <tr key={memorial.id}>
                                            <td className={styles.nameCell}>
                                                <div className={styles.avatar}>
                                                    <img src={memorial.imagem} alt={memorial.nome} />
                                                </div>
                                                <div>
                                                    <span className={styles.name}>{memorial.nome}</span>
                                                    <span className={styles.dateCell}>{memorial.anoNascimento} — {memorial.anoMorte}</span>
                                                </div>
                                            </td>
                                            <td className={styles.locationCell}>
                                                <span className={styles.locationContent}>
                                                    <MapPin size={16} className={styles.pinIcon} />
                                                    {memorial.localizacao}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`${styles.badge} ${memorial.tipo === 'historica' ? styles.badgeHist : styles.badgeRec}`}>
                                                    {memorial.tipo === 'historica' ? 'Histórico' : 'Recente'}
                                                </span>
                                            </td>
                                            <td className={styles.actionsCell}>
                                                <button className={styles.iconBtn} title="Gerar QR Code" onClick={() => openQrModal(memorial)}>
                                                    <QrCode size={18} />
                                                </button>
                                                <button className={styles.iconBtn} title="Editar" onClick={() => openEditModal(memorial)}>
                                                    <Edit size={18} />
                                                </button>
                                                <button className={`${styles.iconBtn} ${styles.deleteBtn}`} title="Excluir" onClick={() => deleteMemorial(memorial.id, memorial.nome)}>
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {currentMemoriais.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className={styles.emptyState}>Nenhum memorial encontrado.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* --- COMPONENTE DE PAGINAÇÃO --- */}
                        {totalPages > 1 && (
                            <div className={styles.paginationContainer}>
                                <p className={styles.paginationInfo}>
                                    Mostrando {startIndex + 1} a {Math.min(startIndex + ITEMS_PER_PAGE, filteredMemoriais.length)} de {filteredMemoriais.length} registros
                                </p>
                                <div className={styles.pagination}>
                                    <button
                                        className={styles.pageBtn}
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(prev => prev - 1)}
                                    >
                                        <ChevronLeft size={18} />
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            className={`${styles.pageBtn} ${page === currentPage ? styles.pageBtnActive : ''}`}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    <button
                                        className={styles.pageBtn}
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(prev => prev + 1)}
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>

            {/* --- MODAL DE FORMULÁRIO (Criar/Editar) --- */}
            {isFormModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContentLarge}>
                        <div className={styles.modalHeader}>
                            <h2>{selectedMemorial ? 'Editar Memorial' : 'Novo Memorial'}</h2>
                            <button className={styles.closeBtn} onClick={closeFormModal}><X size={24} /></button>
                        </div>

                        <form onSubmit={saveMemorial} className={styles.formGrid}>
                            {/* Coluna 1: Dados Básicos */}
                            <div className={styles.formCol}>
                                <h3>Dados Pessoais e Localização</h3>
                                <div className={styles.formGroup}>
                                    <label>Nome Completo *</label>
                                    <input type="text" name="nome" required value={formData.nome} onChange={handleInputChange} />
                                </div>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label>Ano Nasc. *</label>
                                        <input type="number" name="anoNascimento" required value={formData.anoNascimento} onChange={handleInputChange} />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Ano Morte *</label>
                                        <input type="number" name="anoMorte" required value={formData.anoMorte} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label>Data Nasc. Completa</label>
                                        <input type="text" name="dataNascimento" placeholder="Ex: 12/03/1823" value={formData.dataNascimento} onChange={handleInputChange} />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Data Morte Completa</label>
                                        <input type="text" name="dataMorte" placeholder="Ex: 04/11/1912" value={formData.dataMorte} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Setor e Lote *</label>
                                    <input type="text" name="localizacao" required value={formData.localizacao} onChange={handleInputChange} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Categoria (Tipo) *</label>
                                    <select name="tipo" value={formData.tipo} onChange={handleInputChange}>
                                        <option value="historica">Personalidade Histórica</option>
                                        <option value="recente">Memorial Recente</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>URL da Imagem de Perfil (Galeria futura)</label>
                                    <input type="url" name="imagem" placeholder="https://..." value={formData.imagem} onChange={handleInputChange} />
                                </div>
                            </div>

                            {/* Coluna 2: Textos Longos */}
                            <div className={styles.formCol}>
                                <h3>Biografia e Textos</h3>
                                <div className={styles.formGroup}>
                                    <label>Breve Descrição (Subtítulo do Card) *</label>
                                    <textarea name="descricao" rows="2" required value={formData.descricao} onChange={handleInputChange} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Biografia Completa</label>
                                    <textarea name="biografia" rows="6" value={formData.biografia} onChange={handleInputChange} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Mensagem da Família (Opcional)</label>
                                    <textarea name="mensagemFamilia" rows="3" value={formData.mensagemFamilia} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className={styles.modalActionsFull}>
                                <button type="button" className={styles.cancelBtn} onClick={closeFormModal}>Cancelar</button>
                                <button type="submit" className={styles.saveBtn}>Salvar no Banco</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- MODAL DO QR CODE --- */}
            {isQrModalOpen && selectedMemorial && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContentSmall}>
                        <div className={styles.modalHeader}>
                            <h2>QR Code do Memorial</h2>
                            <button className={styles.closeBtn} onClick={() => setIsQrModalOpen(false)}><X size={24} /></button>
                        </div>
                        <div className={styles.qrContainer}>
                            <p>Escaneie para acessar o perfil de <strong>{selectedMemorial.nome}</strong></p>
                            <div className={styles.qrCodeBox}>
                                <QRCode
                                    value={qrCodeUrl}
                                    size={200}
                                    fgColor="#003366"
                                />
                            </div>
                            <p className={styles.qrLinkUrl}>{qrCodeUrl}</p>
                            <button className={styles.saveBtn} onClick={() => window.print()}>
                                Imprimir Placa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}