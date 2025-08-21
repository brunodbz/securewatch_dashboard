import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import SecurityMetricsCard from './components/SecurityMetricsCard';
import SecurityTrendChart from './components/SecurityTrendChart';
import RiskHeatMap from './components/RiskHeatMap';
import ComplianceDashboard from './components/ComplianceDashboard';
import ExecutiveSummaryTable from './components/ExecutiveSummaryTable';
import ExportControls from './components/ExportControls';

const ExecutiveSecuritySummary = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for security metrics
  const securityMetrics = [
    {
      title: 'Pontuação Geral de Segurança',
      value: '92/100',
      change: '+5%',
      changeType: 'positive',
      icon: 'Shield',
      color: 'blue'
    },
    {
      title: 'Tempo de Resposta a Incidentes',
      value: '12 min',
      change: '-18%',
      changeType: 'positive',
      icon: 'Clock',
      color: 'green'
    },
    {
      title: 'Status de Conformidade',
      value: '98,2%',
      change: '+2,1%',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'green'
    },
    {
      title: 'ROI de Segurança',
      value: 'R$ 2,4M',
      change: '+12%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'blue'
    }
  ];

  // Mock data for security trend chart
  const trendData = [
    { period: 'Jan 2025', securityScore: 85, complianceScore: 92, incidentResponse: 18 },
    { period: 'Fev 2025', securityScore: 87, complianceScore: 94, incidentResponse: 16 },
    { period: 'Mar 2025', securityScore: 89, complianceScore: 96, incidentResponse: 15 },
    { period: 'Abr 2025', securityScore: 88, complianceScore: 95, incidentResponse: 17 },
    { period: 'Mai 2025', securityScore: 91, complianceScore: 97, incidentResponse: 14 },
    { period: 'Jun 2025', securityScore: 90, complianceScore: 98, incidentResponse: 13 },
    { period: 'Jul 2025', securityScore: 92, complianceScore: 98, incidentResponse: 12 },
    { period: 'Ago 2025', securityScore: 92, complianceScore: 98, incidentResponse: 12 }
  ];

  // Mock data for risk heat map
  const riskHeatMapData = [
    { department: 'Operações de TI', assets: 245, riskLevel: 'low', score: 92 },
    { department: 'Financeiro', assets: 89, riskLevel: 'medium', score: 78 },
    { department: 'Recursos Humanos', assets: 156, riskLevel: 'low', score: 88 },
    { department: 'Vendas e Marketing', assets: 198, riskLevel: 'high', score: 65 },
    { department: 'Operações', assets: 312, riskLevel: 'medium', score: 74 },
    { department: 'Pesquisa e Desenvolvimento', assets: 134, riskLevel: 'critical', score: 45 }
  ];

  // Mock data for compliance dashboard
  const complianceData = [
    { name: 'Conforme', value: 82, count: 164, status: 'compliant' },
    { name: 'Em Andamento', value: 12, count: 24, status: 'in-progress' },
    { name: 'Não Conforme', value: 4, count: 8, status: 'non-compliant' },
    { name: 'Não Aplicável', value: 2, count: 4, status: 'not-applicable' }
  ];

  // Mock data for executive summary table
  const executiveSummaryData = [
    {
      category: 'Incidente Crítico',
      title: 'Campanha de Phishing Detectada',
      description: 'Ameaça persistente avançada direcionada ao departamento financeiro com tentativas de coleta de credenciais',
      impact: 'Alto',
      status: 'Resolvido',
      timeline: '15-18 Ago, 2025',
      icon: 'AlertTriangle'
    },
    {
      category: 'Remediação',
      title: 'Correção de Vulnerabilidades Concluída',
      description: 'Patches críticos de segurança aplicados em 95% da infraestrutura dentro dos requisitos de SLA',
      impact: 'Médio',
      status: 'Resolvido',
      timeline: '10-20 Ago, 2025',
      icon: 'Shield'
    },
    {
      category: 'Conformidade',
      title: 'Auditoria SOC 2 Tipo II',
      description: 'Auditoria anual de conformidade agendada com avaliação preliminar mostrando controles sólidos',
      impact: 'Baixo',
      status: 'Em Andamento',
      timeline: '1-15 Set, 2025',
      icon: 'FileCheck'
    },
    {
      category: 'Avaliação de Risco',
      title: 'Revisão de Fornecedores Terceiros',
      description: 'Avaliação abrangente de segurança de relacionamentos críticos com fornecedores e acesso a dados',
      impact: 'Médio',
      status: 'Planejado',
      timeline: '20-30 Set, 2025',
      icon: 'Users'
    },
    {
      category: 'Infraestrutura',
      title: 'Implementação de Confiança Zero',
      description: 'Rollout da Fase 2 da arquitetura de confiança zero em acesso remoto e serviços de nuvem',
      impact: 'Alto',
      status: 'Em Andamento',
      timeline: '1 Ago - 31 Out, 2025',
      icon: 'Lock'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const handleExport = async (format, timeRange, department) => {
    // Mock export functionality
    console.log(`Exporting ${format} report for ${timeRange} period, department: ${department}`);
    
    // Simulate export delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real application, this would trigger the actual export
    alert(`Relatório ${format?.toUpperCase()} exportado com sucesso!`);
  };

  const handleTimeRangeChange = (newTimeRange) => {
    setTimeRange(newTimeRange);
    // In a real application, this would trigger data refresh
    console.log(`Time range changed to: ${newTimeRange}`);
  };

  const handleDepartmentChange = (newDepartment) => {
    setSelectedDepartment(newDepartment);
    // In a real application, this would filter data by department
    console.log(`Department filter changed to: ${newDepartment}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Resumo Executivo de Segurança
                </h1>
                <p className="text-muted-foreground">
                  Insights estratégicos de segurança e métricas focadas no negócio para tomada de decisões da liderança
                </p>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Última atualização:</span>
                <span className="font-medium text-foreground">
                  {lastUpdated?.toLocaleString('pt-BR', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Export Controls */}
          <div className="mb-8">
            <ExportControls
              onExport={handleExport}
              onTimeRangeChange={handleTimeRangeChange}
              onDepartmentChange={handleDepartmentChange}
            />
          </div>

          {/* Security Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {securityMetrics?.map((metric, index) => (
              <SecurityMetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Security Trend Chart - 2 columns */}
            <div className="lg:col-span-2">
              <SecurityTrendChart
                data={trendData}
                title="Tendências da Postura de Segurança"
              />
            </div>

            {/* Right Sidebar - 1 column */}
            <div className="space-y-8">
              <RiskHeatMap
                data={riskHeatMapData}
                title="Mapa de Calor de Riscos"
              />
              
              <ComplianceDashboard
                data={complianceData}
                title="Painel de Conformidade"
              />
            </div>
          </div>

          {/* Executive Summary Table */}
          <div className="mb-8">
            <ExecutiveSummaryTable
              data={executiveSummaryData}
              title="Resumo Executivo"
            />
          </div>

          {/* Footer Information */}
          <div className="bg-card border border-border rounded-lg p-6 elevation-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Fontes de Dados</h4>
                <p className="text-sm text-muted-foreground">
                  Elasticsearch SIEM, Trellix EDR, Microsoft Defender, Tenable Vulnerability Management
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Frequência de Atualização</h4>
                <p className="text-sm text-muted-foreground">
                  Alertas em tempo real, métricas de 5 minutos, verificações horárias de vulnerabilidades, relatórios diários de conformidade
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Cobertura</h4>
                <p className="text-sm text-muted-foreground">
                  1.234 ativos monitorados em 6 unidades de negócios com supervisão SOC 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExecutiveSecuritySummary;