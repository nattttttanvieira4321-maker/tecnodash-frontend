import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, AlertTriangle } from 'lucide-react';

const ReportsComponent = ({ patients, stats, exportToExcel }) => {
  const generateAlert = () => {
    const criticalPatients = patients.filter(p => p.status === 'Crítico');
    if (criticalPatients.length > 0) {
      alert(`${criticalPatients.length} paciente(s) em estado crítico precisam de atenção!`);
    } else {
      alert('Nenhum paciente em estado crítico no momento.');
    }
  };

const printReport = () => {
    const printContent = document.getElementById('report-content').innerHTML;

     const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Relatório de Pacientes</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #ccc; }
            .header img { height: 80px; }
            .header div { text-align: center; }
            .header h2 { margin: 0; font-size: 24px; }
            .header p { margin: 0; font-size: 16px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="/logo-prefeitura.png" alt="Logo Prefeitura" />
            <div>
              <h2>Relatório Oncológico</h2>
              <p>São José da Tapera/AL</p>
            </div>
            <img src="/logo-programa.png" alt="Logo Programa" />
          </div>
          ${printContent}
        </body>
      </html>`
    );
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">Gere e exporte relatórios do sistema</p>
        </div>

        <div id="report-content">
          <Card>
            <CardHeader>
              <CardTitle>Relatório Geral de Pacientes</CardTitle>
              <CardDescription>Visão geral de todos os pacientes cadastrados</CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">ID</th>
                    <th className="text-left">Nome</th>
                    <th className="text-left">Idade</th>
                    <th className="text-left">Tipo de Câncer</th>
                    <th className="text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map(patient => (
                    <tr key={patient.id}>
                      <td>{patient.id}</td>
                      <td>{patient.name}</td>
                      <td>{patient.age}</td>
                      <td>{patient.cancerType}</td>
                      <td>{patient.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ações</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={printReport} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Gerar PDF
            </Button>
            <Button onClick={exportToExcel} variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Exportar para Excel
            </Button>
            <Button onClick={generateAlert} variant="outline" className="w-full">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Gerar Alerta
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumo dos Dados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total de Pacientes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">{stats.inTreatment}</p>
                <p className="text-sm text-muted-foreground">Em Tratamento</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.cured}</p>
                <p className="text-sm text-muted-foreground">Curados</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
                <p className="text-sm text-muted-foreground">Críticos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ReportsComponent;
