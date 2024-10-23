import { useState } from 'react';
import { Search, User, Edit2, ArrowLeft, Trash2, MoreVertical, X, Check, Calendar, Plus, LogOut, Settings, Copy, Share2 } from 'lucide-react';

export default function ActivityTracker() {
  // Log para verificar se o componente foi renderizado
  console.log("ActivityTracker component rendered");

  const [activities, setActivities] = useState([
    { id: 1, description: 'Breve descrição da mesma', date: '00/00/0000', details: 'Informações adicionais da atividade 1', responsible: 'Responsável' },
    { id: 2, description: 'Breve descrição da mesma', date: '00/00/0000', details: 'Informações adicionais da atividade 2', responsible: 'Responsável' },
    { id: 3, description: 'Breve descrição da mesma', date: '00/00/0000', details: 'Informações adicionais da atividade 3', responsible: 'Responsável' },
    { id: 4, description: 'Breve descrição da mesma', date: '00/00/0000', details: 'Informações adicionais da atividade 4', responsible: 'Responsável' },
  ]);

  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [editingResponsible, setEditingResponsible] = useState<number | null>(null);
  const [editingDate, setEditingDate] = useState<number | null>(null);
  const [tempResponsible, setTempResponsible] = useState('');
  const [tempDate, setTempDate] = useState('');
  const [isCreatingActivity, setIsCreatingActivity] = useState(false);
  const [newActivity, setNewActivity] = useState({ description: '', date: '', responsible: '', details: '' });
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [openMoreMenu, setOpenMoreMenu] = useState<number | null>(null);

  // Log para depuração ao adicionar uma atividade
  const handleCreateActivity = () => {
    if (newActivity.description && newActivity.date && newActivity.responsible) {
      console.log("Creating a new activity:", newActivity);
      setActivities([...activities, { ...newActivity, id: activities.length + 1 }]);
      setNewActivity({ description: '', date: '', responsible: '', details: '' });
      setIsCreatingActivity(false);
    } else {
      console.log("New activity missing fields");
    }
  };

  const handleDelete = (id: number) => {
    console.log("Deleting activity with id:", id);
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const toggleMenu = (id: number) => {
    console.log("Toggling menu for activity id:", id);
    setOpenMenu(openMenu === id ? null : id);
  };

  const toggleMoreMenu = (id: number) => {
    console.log("Toggling more menu for activity id:", id);
    setOpenMoreMenu(openMoreMenu === id ? null : id);
  };

  const handleCopyActivity = (activity: typeof activities[0]) => {
    const newActivity = { ...activity, id: activities.length + 1 };
    console.log("Copying activity:", activity.id);
    setActivities([...activities, newActivity]);
    setOpenMoreMenu(null);
  };

  const handleShareActivity = (activity: typeof activities[0]) => {
    console.log("Sharing activity:", activity.id);
    // Lógica de compartilhamento...
    setOpenMoreMenu(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-700 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="p-1 hover:bg-green-600 rounded-full transition-colors" aria-label="Voltar">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="font-bold text-2xl">Banese</span>
          <span className="text-sm">KR anual - 1/Atividades</span>
        </div>
        <div className="relative">
          <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="p-1 hover:bg-green-600 rounded-full transition-colors" aria-label="Menu do usuário">
            <User className="w-6 h-6" />
          </button>
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                <User className="inline-block w-4 h-4 mr-2" />
                Perfil
              </button>
              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                <Settings className="inline-block w-4 h-4 mr-2" />
                Configurações
              </button>
              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                <LogOut className="inline-block w-4 h-4 mr-2" />
                Sair
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto p-4">
        {/* Input para busca */}
        <div className="relative mb-6">
          <input type="text" placeholder="Buscar..." className="w-full p-2 pl-10 rounded-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
        </div>

        {/* Atividades */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            {isCreatingActivity ? (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Descrição da atividade"
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="date"
                  value={newActivity.date}
                  onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Responsável"
                  value={newActivity.responsible}
                  onChange={(e) => setNewActivity({...newActivity, responsible: e.target.value})}
                  className="w-full p-2 border rounded"
                />
                <textarea
                  placeholder="Detalhes adicionais"
                  value={newActivity.details}
                  onChange={(e) => setNewActivity({...newActivity, details: e.target.value})}
                  className="w-full p-2 border rounded"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsCreatingActivity(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreateActivity}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsCreatingActivity(true)}
                className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Criar Atividade</span>
              </button>
            )}
          </div>

          {activities.map((activity, index) => (
            <div key={activity.id} className={`flex ${index % 2 === 0 ? 'bg-green-100' : 'bg-green-50'}`}>
              <div className="flex-1 p-4">
                <h3 className="font-semibold text-green-700">Atividade - {activity.id}</h3>
                <p className="text-green-800">{activity.description}</p>
                {openMenu === activity.id && (
                  <div className="mt-2 p-2 bg-white rounded shadow">
                    <p className="text-sm text-gray-600">{activity.details}</p>
                  </div>
                )}
              </div>
              {/* Menu de ações */}
              <div className="flex items-center justify-center w-40 bg-green-300 p-2">
                <button onClick={() => toggleMenu(activity.id)} className="p-2 text-green-700 hover:bg-green-400 transition-colors" aria-label="Abrir Menu">
                  <Edit2 className="w-5 h-5" />
                </button>
                <button onClick={() => handleDelete(activity.id)} className="p-2 text-red-600 hover:bg-red-100 transition-colors" aria-label="Excluir Atividade">
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="relative">
                  <button onClick={() => toggleMoreMenu(activity.id)} className="p-2 text-green-700 hover:bg-green-400 transition-colors" aria-label="Mais opções">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  {openMoreMenu === activity.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <button onClick={() => handleCopyActivity(activity)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                        <Copy className="inline-block w-4 h-4 mr-2" />
                        Duplicar Atividade
                      </button>
                      <button onClick={() => handleShareActivity(activity)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                        <Share2 className="inline-block w-4 h-4 mr-2" />
                        Compartilhar Atividade
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
