"use client";

import { useState, useEffect } from 'react';
import { Search, User, Edit2, ArrowLeft, Trash2, MoreVertical, Plus, LogOut, Settings, Copy, Share2, Check, X, Calendar } from 'lucide-react';

interface Activity {
  id: number;
  description: string;
  date: string;
  details: string;
  responsible: string;
}

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-green-100 p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-green-800">Confirmar exclusão</h2>
        <p className="mb-6 text-green-700">Tem certeza que deseja excluir esta atividade?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-200 text-green-800 rounded hover:bg-green-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

interface RequiredFieldsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const RequiredFieldsPopup: React.FC<RequiredFieldsPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-green-100 p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-green-800">Campos Obrigatórios</h2>
        <p className="mb-6 text-green-700">Por favor, preencha todos os campos obrigatórios antes de salvar.</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ActivityTracker() {
  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, description: 'Breve descrição da atividade 1', date: '01/01/2023', details: 'Informações adicionais da atividade 1', responsible: 'Responsável 1' },
    { id: 2, description: 'Breve descrição da atividade 2', date: '02/01/2023', details: 'Informações adicionais da atividade 2', responsible: 'Responsável 2' },
    { id: 3, description: 'Breve descrição da atividade 3', date: '03/01/2023', details: 'Informações adicionais da atividade 3', responsible: 'Responsável 3' },
    { id: 4, description: 'Breve descrição da atividade 4', date: '04/01/2023', details: 'Informações adicionais da atividade 4', responsible: 'Responsável 4' },
  ]); 

  const [filteredActivities, setFilteredActivities] = useState(activities);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatingActivity, setIsCreatingActivity] = useState(false);
  const [newActivity, setNewActivity] = useState({ description: '', date: '', responsible: '', details: '' });
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [openMoreMenu, setOpenMoreMenu] = useState<number | null>(null);
  const [editingResponsible, setEditingResponsible] = useState<number | null>(null);
  const [editingDate, setEditingDate] = useState<number | null>(null);
  const [editingDetails, setEditingDetails] = useState<number | null>(null);
  const [tempResponsible, setTempResponsible] = useState('');
  const [tempDate, setTempDate] = useState('');
  const [tempDetails, setTempDetails] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; activityId: number | null }>({
    isOpen: false,
    activityId: null,
  });
  const [showRequiredFieldsPopup, setShowRequiredFieldsPopup] = useState(false);
  const [editingDescription, setEditingDescription] = useState<number | null>(null);
  const [tempDescription, setTempDescription] = useState('');

  useEffect(() => {
    const results = activities.filter(activity =>
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.responsible.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.date.includes(searchTerm)
    );
    setFilteredActivities(results);
  }, [searchTerm, activities]);

  const handleCreateActivity = () => {
    if (newActivity.description && newActivity.date && newActivity.responsible) {
      const formattedDate = new Date(newActivity.date).toLocaleDateString('pt-BR');
      setActivities([...activities, { ...newActivity, id: activities.length + 1, date: formattedDate }]);
      setNewActivity({ description: '', date: '', responsible: '', details: '' });
      setIsCreatingActivity(false);
    } else {
      setShowRequiredFieldsPopup(true);
    }
  };

  const handleDeleteConfirmation = (id: number) => {
    setDeleteConfirmation({ isOpen: true, activityId: id });
  };

  const handleDelete = () => {
    if (deleteConfirmation.activityId) {
      setActivities(activities.filter(activity => activity.id !== deleteConfirmation.activityId));
      setDeleteConfirmation({ isOpen: false, activityId: null });
    }
  };

  const toggleMoreMenu = (id: number) => {
    setOpenMoreMenu(openMoreMenu === id ? null : id);
  };

  const handleCopyActivity = (activity: Activity) => {
    const newActivity = { ...activity, id: activities.length + 1 };
    setActivities([...activities, newActivity]);
    setOpenMoreMenu(null);
  };

  const handleShareActivity = (activity: Activity) => {
    alert(`Compartilhando atividade: ${activity.id}`);
    setOpenMoreMenu(null);
  };

  const startEditingResponsible = (id: number, responsible: string) => {
    setEditingResponsible(id);
    setTempResponsible(responsible);
  };

  const saveResponsible = (id: number) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, responsible: tempResponsible } : activity
    ));
    setEditingResponsible(null);
  };

  const startEditingDate = (id: number, date: string) => {
    setEditingDate(id);
    setTempDate(date);
  };

  const saveDate = (id: number) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, date: tempDate } : activity
    ));
    setEditingDate(null);
  };

  const startEditingDetails = (id: number, details: string) => {
    setEditingDetails(id);
    setTempDetails(details);
  };

  const saveDetails = (id: number) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, details: tempDetails } : activity
    ));
    setEditingDetails(null);
  };

  const startEditingDescription = (id: number, description: string) => {
    setEditingDescription(id);
    setTempDescription(description);
  };

  const saveDescription = (id: number) => {
    setActivities(activities.map(activity =>
      activity.id === id ? { ...activity, description: tempDescription } : activity
    ));
    setEditingDescription(null);
  };

  return (
    <>
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
        <div className="relative mb-6">
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="w-full p-2 pl-10 rounded-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            {isCreatingActivity ? (
              <div className="space-y-4 bg-green-50 p-6 rounded-lg shadow-inner">
                <div className="space-y-2">
                  <label htmlFor="activity-description" className="block text-sm font-medium text-green-700">
                    Descrição da atividade
                  </label>
                  <input
                    id="activity-description"
                    type="text"
                    placeholder="Digite a descrição da atividade"
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                    className="w-full p-3 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500 bg-green-50"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="activity-date" className="block text-sm font-medium text-green-700">
                      Data
                    </label>
                    <input
                      id="activity-date"
                      type="date"
                      value={newActivity.date}
                      onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
                      className="w-full p-3 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500 bg-green-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="activity-responsible" className="block text-sm font-medium text-green-700">
                      Responsável
                    </label>
                    <input
                      id="activity-responsible"
                      type="text"
                      placeholder="Nome do responsável"
                      value={newActivity.responsible}
                      onChange={(e) => setNewActivity({ ...newActivity, responsible: e.target.value })}
                      className="w-full p-3 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500 bg-green-50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="activity-details" className="block text-sm font-medium text-green-700">
                    Detalhes adicionais
                  </label>
                  <textarea
                    id="activity-details"
                    placeholder="Detalhes adicionais da atividade"
                    value={newActivity.details}
                    onChange={(e) => setNewActivity({ ...newActivity, details: e.target.value })}
                    className="w-full p-3 border border-green-300 rounded-md shadow-sm focus:ring-green-500  focus:border-green-500 text-gray-900 placeholder-gray-500 bg-green-50"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsCreatingActivity(false)}
                    className="px-4 py-2 bg-white text-green-700 border border-green-300 rounded-md hover:bg-green-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreateActivity}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsCreatingActivity(true)}
                className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 p-2 rounded-md"
              >
                <Plus className="w-5 h-5" />
                <span>Criar Atividade</span>
              </button>
            )}
          </div>

          {filteredActivities.map((activity, index) => (
            <div key={activity.id} className={`flex flex-col ${index % 2 === 0 ? 'bg-green-100' : 'bg-green-50'} p-4 border-b border-green-200`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-green-700 mb-2">Atividade - {activity.id}</h3>
                  {editingDescription === activity.id ? (
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={tempDescription}
                        onChange={(e) => setTempDescription(e.target.value)}
                        className="w-full p-2 text-sm border rounded bg-white text-gray-900"
                      />
                      <button
                        onClick={() => saveDescription(activity.id)}
                        className="ml-2 p-2 text-green-700 hover:bg-green-300 rounded transition-colors"
                        aria-label="Salvar descrição"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <p 
                      className="text-green-800 cursor-pointer hover:underline" 
                      onClick={() => startEditingDescription(activity.id, activity.description)}
                    >
                      {activity.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center justify-center bg-green-200 p-2 rounded">
                    <User className="text-green-700 mb-1" />
                    {editingResponsible === activity.id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={tempResponsible}
                          onChange={(e) => setTempResponsible(e.target.value)}
                          className="w-full p-1 text-sm border rounded bg-white text-gray-900"
                        />
                        <button
                          onClick={() => saveResponsible(activity.id)}
                          className="ml-1 p-1 text-green-700 hover:bg-green-300 rounded transition-colors"
                          aria-label="Salvar responsável"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditingResponsible(activity.id, activity.responsible)}
                        className="text-sm text-green-800 hover:underline"
                      >
                        {activity.responsible}
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center bg-green-300 p-2 rounded">
                    <Calendar className="text-green-700 mb-1" />
                    {editingDate === activity.id ? (
                      <div className="flex items-center">
                        <input
                          type="date"
                          value={tempDate}
                          onChange={(e) => setTempDate(e.target.value)}
                          className="w-full p-1 text-sm border rounded bg-white text-gray-900"
                        />
                        <button
                          onClick={() => saveDate(activity.id)}
                          className="ml-1 p-1 text-green-700 hover:bg-green-300 rounded transition-colors"
                          aria-label="Salvar data"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditingDate(activity.id, activity.date)}
                        className="text-sm text-green-800 hover:underline"
                      >
                        {activity.date}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-green-700">Informações Adicionais:</h4>
                  <button 
                    onClick={() => startEditingDetails(activity.id, activity.details)} 
                    className="p-2 text-green-700 hover:bg-green-100 transition-colors rounded"
                    aria-label="Editar detalhes"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
                {editingDetails === activity.id ? (
                  <div className="flex flex-col items-start">
                    <textarea
                      value={tempDetails}
                      onChange={(e) => setTempDetails(e.target.value)}
                      className="w-full p-2 text-sm border rounded mb-2 bg-green-50 text-gray-900"
                      rows={3}
                    />
                    <button
                      onClick={() => saveDetails(activity.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      Salvar Detalhes
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">{activity.details}</p>
                )}
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button 
                  onClick={() => handleDeleteConfirmation(activity.id)} 
                  className="p-2 text-red-600 hover:bg-red-100 transition-colors rounded"
                  aria-label="Excluir atividade"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="relative">
                  <button 
                    onClick={() => toggleMoreMenu(activity.id)} 
                    className="p-2 text-green-700 hover:bg-green-100 transition-colors rounded" 
                    aria-label="Mais opções"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  {openMoreMenu === activity.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <button 
                        onClick={() => handleCopyActivity(activity)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <Copy className="inline-block w-4 h-4 mr-2" />
                        Duplicar Atividade
                      </button>
                      <button 
                        onClick={() => handleShareActivity(activity)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
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
      <DeleteConfirmation
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, activityId: null })}
        onConfirm={handleDelete}
      />
      <RequiredFieldsPopup
        isOpen={showRequiredFieldsPopup}
        onClose={() => setShowRequiredFieldsPopup(false)}
      />
    </div>
    </>
  );
}