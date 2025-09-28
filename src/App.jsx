import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FileText,
  LogOut,
  Menu,
  X,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Calendar,
  MapPin,
  Hospital,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  BarChart3,
  PieChart,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';


import ReportsComponent from './ReportsComponent';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientDialog, setShowPatientDialog] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [period, setPeriod] = useState('all');

  // Dados de demonstração
  const demoPatients = [
    {
      id: 'P001',
      name: 'Maria Silva Santos',
      age: 58,
      gender: 'Feminino',
      cancerType: 'Mama',
      stage: 'Estágio II',
      status: 'Em Tratamento',
      registrationDate: '2024-01-15',
      lastConsultation: '2024-09-20',
      hospital: 'Hospital Regional',
      zone: 'Urbana',
      city: 'São José da Tapera',
      neighborhood: 'Centro',
      phone: '(82) 99999-0001',
      cpf: '123.456.789-01',
      treatmentStartDate: '2024-02-01',
      sessions: 12,
      completedSessions: 8,
      observations: 'Paciente respondendo bem ao tratamento. Próxima consulta agendada.',
      photo: null
    },
    {
      id: 'P002',
      name: 'João Santos Lima',
      age: 65,
      gender: 'Masculino',
      cancerType: 'Próstata',
      stage: 'Estágio I',
      status: 'Curado',
      registrationDate: '2023-11-10',
      lastConsultation: '2024-09-19',
      hospital: 'Hospital Municipal',
      zone: 'Rural',
      city: 'São José da Tapera',
      neighborhood: 'Zona Rural',
      phone: '(82) 99999-0002',
      cpf: '234.567.890-12',
      treatmentStartDate: '2023-12-01',
      treatmentEndDate: '2024-06-15',
      sessions: 20,
      completedSessions: 20,
      observations: 'Tratamento concluído com sucesso. Paciente em remissão completa.',
      photo: null
    },
    {
      id: 'P003',
      name: 'Ana Costa Oliveira',
      age: 42,
      gender: 'Feminino',
      cancerType: 'Pulmão',
      stage: 'Estágio III',
      status: 'Em Tratamento',
      registrationDate: '2024-03-20',
      lastConsultation: '2024-09-18',
      hospital: 'Hospital Regional',
      zone: 'Urbana',
      city: 'São José da Tapera',
      neighborhood: 'Bairro Novo',
      phone: '(82) 99999-0003',
      cpf: '345.678.901-23',
      treatmentStartDate: '2024-04-05',
      sessions: 16,
      completedSessions: 10,
      observations: 'Paciente em tratamento intensivo. Monitoramento constante necessário.',
      photo: null
    },
    {
      id: 'P004',
      name: 'Pedro Lima Ferreira',
      age: 71,
      gender: 'Masculino',
      cancerType: 'Cólon',
      stage: 'Estágio IV',
      status: 'Crítico',
      registrationDate: '2024-02-28',
      lastConsultation: '2024-09-17',
      hospital: 'Hospital Regional',
      zone: 'Urbana',
      city: 'São José da Tapera',
      neighborhood: 'Centro',
      phone: '(82) 99999-0004',
      cpf: '456.789.012-34',
      treatmentStartDate: '2024-03-15',
      sessions: 24,
      completedSessions: 18,
      observations: 'Estado crítico. Cuidados paliativos. Família acompanhando.',
      photo: null
    },
    {
      id: 'P005',
      name: 'Carmen Rodrigues',
      age: 55,
      gender: 'Feminino',
      cancerType: 'Ovário',
      stage: 'Estágio II',
      status: 'Em Tratamento',
      registrationDate: '2024-01-08',
      lastConsultation: '2024-09-16',
      hospital: 'Hospital Municipal',
      zone: 'Rural',
      city: 'São José da Tapera',
      neighborhood: 'Sítio Esperança',
      phone: '(82) 99999-0005',
      cpf: '567.890.123-45',
      treatmentStartDate: '2024-01-25',
      sessions: 14,
      completedSessions: 9,
      observations: 'Evolução positiva. Paciente colaborativa e otimista.',
      photo: null
    },
    {
      id: 'P006',
      name: 'Roberto Silva',
      age: 48,
      gender: 'Masculino',
      cancerType: 'Estômago',
      stage: 'Estágio I',
      status: 'Curado',
      registrationDate: '2023-08-12',
      lastConsultation: '2024-09-15',
      hospital: 'Hospital Regional',
      zone: 'Urbana',
      city: 'São José da Tapera',
      neighborhood: 'Vila Nova',
      phone: '(82) 99999-0006',
      cpf: '678.901.234-56',
      treatmentStartDate: '2023-09-01',
      treatmentEndDate: '2024-03-20',
      sessions: 18,
      completedSessions: 18,
      observations: 'Recuperação completa. Exames de controle normais.',
      photo: null
    }
  ];

  useEffect(() => {
    setPatients(demoPatients);
    
    const criticalPatients = demoPatients.filter(p => p.status === 'Crítico');
    if (criticalPatients.length > 0) {
      setNotifications([
        {
          id: 1,
          type: 'critical',
          message: `${criticalPatients.length} paciente(s) em estado crítico requerem atenção imediata`,
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Visão geral do sistema'
    },
    {
      id: 'patients',
      label: 'Lista de Pacientes',
      icon: Users,
      description: 'Gerenciar pacientes cadastrados'
    },
    {
      id: 'register',
      label: 'Cadastrar Novo Paciente',
      icon: UserPlus,
      description: 'Adicionar novo paciente'
    },
    {
      id: 'reports',
      label: 'Relatórios',
      icon: FileText,
      description: 'Gerar relatórios e estatísticas'
    }
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleMenuClick = (pageId) => {
    setCurrentPage(pageId);
    setSidebarOpen(false);
  };

  const getPatientInitials = (name) => {
    return name.split(' ').map(n => n.charAt(0)).join('').substring(0, 2).toUpperCase();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Em Tratamento': return 'bg-yellow-500';
      case 'Curado': return 'bg-green-500';
      case 'Crítico': return 'bg-red-500';
      case 'Alta': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

    const filteredPatients = patients.filter(patient => {
    const patientDate = new Date(patient.registrationDate);
    const now = new Date();
    let matchPeriod = false;

    switch (period) {
      case 'today':
        matchPeriod = patientDate.toDateString() === now.toDateString();
        break;
      case 'this_week':
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        matchPeriod = patientDate >= startOfWeek;
        break;
      case 'this_month':
        matchPeriod = patientDate.getMonth() === now.getMonth() && patientDate.getFullYear() === now.getFullYear();
        break;
      case 'this_year':
        matchPeriod = patientDate.getFullYear() === now.getFullYear();
        break;
      case 'all':
      default:
        matchPeriod = true;
        break;
    }

    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.cancerType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus;
    return matchPeriod && matchesSearch && matchesFilter;
  });

  const calculateStats = (patientsToFilter) => {
    const total = patientsToFilter.length;
    const inTreatment = patientsToFilter.filter(p => p.status === 'Em Tratamento').length;
    const cured = patientsToFilter.filter(p => p.status === 'Curado').length;
    const critical = patientsToFilter.filter(p => p.status === 'Crítico').length;
    const averageAge = total > 0 ? Math.round(patientsToFilter.reduce((sum, p) => sum + p.age, 0) / total) : 0;
    
    return { total, inTreatment, cured, critical, averageAge };
  };

  const stats = calculateStats(filteredPatients);

  const chartData = [
    { name: 'Em Tratamento', value: stats.inTreatment, color: '#f59e0b' },
    { name: 'Curado', value: stats.cured, color: '#10b981' },
    { name: 'Crítico', value: stats.critical, color: '#ef4444' }
  ];

  const ageData = [
    { range: '20-39', count: patients.filter(p => p.age >= 20 && p.age < 40).length },
    { range: '40-59', count: patients.filter(p => p.age >= 40 && p.age < 60).length },
    { range: '60+', count: patients.filter(p => p.age >= 60).length }
  ];

  const addPatient = (newPatient) => {
    const patientWithId = {
      ...newPatient,
      id: `P${String(patients.length + 1).padStart(3, '0')}`,
      registrationDate: new Date().toISOString().split('T')[0],
      lastConsultation: new Date().toISOString().split('T')[0]
    };
    setPatients([...patients, patientWithId]);
    setCurrentPage('patients');
  };

  const editPatient = (updatedPatient) => {
    setPatients(patients.map(p => p.id === updatedPatient.id ? updatedPatient : p));
    setSelectedPatient(null);
    setShowPatientDialog(false);
  };

  const exportToExcel = () => {
  window.open("http://localhost:5001/export/excel");
  };

  const deletePatient = (patientId) => {
    if (confirm('Tem certeza que deseja excluir este paciente?')) {
      setPatients(patients.filter(p => p.id !== patientId));
    }
  };

  const LoginComponent = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-primary rounded-full"></div>
            </div>
          </div>
          <CardTitle className="text-2xl">Sistema Oncológico</CardTitle>
          <CardDescription>São José da Tapera/AL</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Usuário</Label>
              <Input id="username" placeholder="Digite seu usuário" />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" placeholder="Digite sua senha" />
            </div>
            <Button 
              onClick={() => setIsAuthenticated(true)} 
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              Entrar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const DashboardComponent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Dados atualizados em tempo real - {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Períodos</SelectItem>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="this_week">Esta Semana</SelectItem>
              <SelectItem value="this_month">Este Mês</SelectItem>
              <SelectItem value="this_year">Este Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setCurrentPage('register')} size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500">
            <Plus className="h-4 w-4 mr-2" />
            Novo Paciente
          </Button>
        </div>
      </div>

      {notifications.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {notifications[0].message}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total de Pacientes</p>
                <p className="text-3xl font-bold">{stats.total}</p>
                <p className="text-blue-100 text-xs">+2 este mês</p>
              </div>
              <Users className="h-10 w-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Em Tratamento</p>
                <p className="text-3xl font-bold">{stats.inTreatment}</p>
                <p className="text-green-100 text-xs">+8% vs mês anterior</p>
              </div>
              <Activity className="h-10 w-10 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-100 text-sm font-medium">Curados</p>
                <p className="text-3xl font-bold">{stats.cured}</p>
                <p className="text-cyan-100 text-xs">+15% vs mês anterior</p>
              </div>
              <CheckCircle className="h-10 w-10 text-cyan-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium">Alertas</p>
                <p className="text-3xl font-bold">{stats.critical}</p>
                <p className="text-yellow-100 text-xs">Casos críticos</p>
              </div>
              <AlertTriangle className="h-10 w-10 text-yellow-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Distribuição por Tipo de Câncer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Pacientes por Faixa Etária
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const PatientsListComponent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Lista de Pacientes</h1>
          <p className="text-muted-foreground">Gerencie os pacientes cadastrados no sistema</p>
        </div>
        <Button onClick={() => setCurrentPage('register')} size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500">
          <Plus className="h-4 w-4 mr-2" />
          Novo Paciente
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar paciente..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="Em Tratamento">Em Tratamento</SelectItem>
            <SelectItem value="Curado">Curado</SelectItem>
            <SelectItem value="Crítico">Crítico</SelectItem>
            <SelectItem value="Alta">Alta</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Câncer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estágio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Consulta</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.map(patient => (
                  <tr key={patient.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.cancerType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.stage}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(patient.lastConsultation).toLocaleDateString('pt-BR')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => {
                          setSelectedPatient(patient);
                          setShowPatientDialog(true);
                        }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => {
                          setSelectedPatient(patient);
                          setCurrentPage('register');
                        }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deletePatient(patient.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selectedPatient && (
        <Dialog open={showPatientDialog} onOpenChange={setShowPatientDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalhes do Paciente</DialogTitle>
              <DialogDescription>Informações completas sobre {selectedPatient.name}</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="relative w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 text-3xl font-bold">
                  {getPatientInitials(selectedPatient.name)}
                </div>
                <h3 className="text-lg font-semibold">{selectedPatient.name}</h3>
                <Badge className={`mt-2 text-white ${getStatusColor(selectedPatient.status)}`}>{selectedPatient.status}</Badge>
              </div>
              <div className="md:col-span-2 grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div><Label>Idade</Label><p>{selectedPatient.age} anos</p></div>
                <div><Label>Gênero</Label><p>{selectedPatient.gender}</p></div>
                <div><Label>CPF</Label><p>{selectedPatient.cpf}</p></div>
                <div><Label>Telefone</Label><p>{selectedPatient.phone}</p></div>
                <div className="col-span-2"><Label>Endereço</Label><p>{selectedPatient.neighborhood}, {selectedPatient.zone}, {selectedPatient.city}</p></div>
                <hr className="col-span-2"/>
                <div><Label>Tipo de Câncer</Label><p>{selectedPatient.cancerType}</p></div>
                <div><Label>Estágio</Label><p>{selectedPatient.stage}</p></div>
                <div><Label>Hospital</Label><p>{selectedPatient.hospital}</p></div>
                <div><Label>Data de Cadastro</Label><p>{new Date(selectedPatient.registrationDate).toLocaleDateString('pt-BR')}</p></div>
                <div><Label>Início do Tratamento</Label><p>{new Date(selectedPatient.treatmentStartDate).toLocaleDateString('pt-BR')}</p></div>
                <div className="col-span-2"><Label>Observações</Label><p className="text-muted-foreground">{selectedPatient.observations}</p></div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );

  const PatientRegistrationComponent = () => {
    const [formData, setFormData] = useState({
      name: '', age: '', gender: '', cancerType: '', stage: '', status: 'Em Tratamento',
      hospital: '', zone: '', city: '', neighborhood: '', phone: '', cpf: '', treatmentStartDate: '', observations: ''
    });

    useEffect(() => {
      if (selectedPatient) {
        setFormData({
          name: selectedPatient.name, age: selectedPatient.age, gender: selectedPatient.gender,
          cancerType: selectedPatient.cancerType, stage: selectedPatient.stage, status: selectedPatient.status,
          hospital: selectedPatient.hospital, zone: selectedPatient.zone, city: selectedPatient.city,
          neighborhood: selectedPatient.neighborhood, phone: selectedPatient.phone, cpf: selectedPatient.cpf,
          treatmentStartDate: selectedPatient.treatmentStartDate, observations: selectedPatient.observations
        });
      } else {
        setFormData({
          name: '', age: '', gender: '', cancerType: '', stage: '', status: 'Em Tratamento',
          hospital: '', zone: '', city: '', neighborhood: '', phone: '', cpf: '', treatmentStartDate: '', observations: ''
        });
      }
    }, [selectedPatient]);

    const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (id, value) => {
      setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (selectedPatient) {
        editPatient({ ...formData, id: selectedPatient.id });
      } else {
        addPatient(formData);
      }
      setFormData({
        name: '', age: '', gender: '', cancerType: '', stage: '', status: 'Em Tratamento',
        hospital: '', zone: '', city: '', neighborhood: '', phone: '', cpf: '', treatmentStartDate: '', observations: ''
      });
      setSelectedPatient(null);
    };

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{selectedPatient ? 'Editar Paciente' : 'Cadastrar Novo Paciente'}</h1>
          <p className="text-muted-foreground">Preencha os dados para {selectedPatient ? 'atualizar o paciente' : 'cadastrar um novo paciente'}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{selectedPatient ? 'Dados do Paciente' : 'Novo Paciente'}</CardTitle>
            <CardDescription>Informações pessoais e médicas</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" value={formData.name} onChange={handleChange} placeholder="Nome completo do paciente" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Idade</Label>
                <Input id="age" type="number" value={formData.age} onChange={handleChange} placeholder="Idade" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gênero</Label>
                <Select id="gender" value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Feminino">Feminino</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" value={formData.cpf} onChange={handleChange} placeholder="CPF do paciente" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" value={formData.phone} onChange={handleChange} placeholder="Telefone de contato" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" value={formData.city} onChange={handleChange} placeholder="Cidade" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input id="neighborhood" value={formData.neighborhood} onChange={handleChange} placeholder="Bairro" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zone">Zona</Label>
                <Select id="zone" value={formData.zone} onValueChange={(value) => handleSelectChange('zone', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar zona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Urbana">Urbana</SelectItem>
                    <SelectItem value="Rural">Rural</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospital">Hospital de Referência</Label>
                <Input id="hospital" value={formData.hospital} onChange={handleChange} placeholder="Hospital onde o paciente é atendido" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cancerType">Tipo de Câncer</Label>
                <Input id="cancerType" value={formData.cancerType} onChange={handleChange} placeholder="Ex: Mama, Próstata" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stage">Estágio</Label>
                <Input id="stage" value={formData.stage} onChange={handleChange} placeholder="Ex: Estágio I, II, III, IV" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status do Tratamento</Label>
                <Select id="status" value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Em Tratamento">Em Tratamento</SelectItem>
                    <SelectItem value="Curado">Curado</SelectItem>
                    <SelectItem value="Crítico">Crítico</SelectItem>
                    <SelectItem value="Alta">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="treatmentStartDate">Data de Início do Tratamento</Label>
                <Input id="treatmentStartDate" type="date" value={formData.treatmentStartDate} onChange={handleChange} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="observations">Observações</Label>
                <Textarea id="observations" value={formData.observations} onChange={handleChange} placeholder="Observações adicionais sobre o paciente" rows="3" />
              </div>
              <div className="md:col-span-2 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => {
                  setSelectedPatient(null);
                  setCurrentPage('patients');
                }}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-blue-500 to-cyan-500">
                  {selectedPatient ? 'Salvar Alterações' : 'Cadastrar Paciente'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardComponent />;
      case 'patients':
        return <PatientsListComponent />;
      case 'register':
        return <PatientRegistrationComponent />;
      case 'reports':
        return <ReportsComponent patients={patients} stats={stats} exportToExcel={exportToExcel} />;

      default:
        return <DashboardComponent />;
    }
  };

  if (!isAuthenticated) {
    return <LoginComponent />;
  }

  return (
    <div className="flex h-screen bg-muted/40">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-10 w-64 bg-background border-r transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <a href="#" className="flex items-center gap-2 font-semibold">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded-md flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
              </div>
              <span className="text-lg">OncoCare</span>
            </a>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <ul className="grid items-start gap-2 px-4 text-sm font-medium">
              {menuItems.map(item => (
                <li key={item.id}>
                  <a
                    href="#"
                    onClick={() => handleMenuClick(item.id)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${currentPage === item.id ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto p-4 border-t">
            <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="w-full flex-1">
            {/* Search or other header content */}
          </div>
          <div className="flex items-center gap-4">
            {notifications.length > 0 && (
              <div className="relative">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-xs text-white"></span>
              </div>
            )}
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
              <User className="h-5 w-5" />
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-muted/40">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;

