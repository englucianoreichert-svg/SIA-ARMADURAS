# SIA — Sistema Integrado de Armaduras

**Versão 0.3**

Aplicação web estática (HTML, CSS e JavaScript), preparada para publicação no GitHub Pages.

## Ajustes da versão 0.3\n- Bitolas selecionadas em lista fixa: 5; 6,3; 8; 10; 12,5; 16; 20; 25; 32; 40.\n- Módulo 01 solicita fck, bitola e aço (CA-50 padrão), sem comprimento básico ou fator manual.\n- Emendas calculadas automaticamente para boa e má aderência.\n- Resultados mostram os cenários de percentual de barras emendadas e coeficiente α₀t, sem campo de entrada para fator.\n- Emendas por traspasse acima de 32 mm são bloqueadas.
- Campos de diâmetro exibem a unidade `mm` fora do campo editável.
- Campos de bitola usam o rótulo `Ø BARRA =`, com o valor numérico editável e `mm` como unidade fixa externa.
- Demais campos em milímetros também exibem a unidade fora do campo de entrada.

## Módulos incluídos
1. Emendas por traspasse — cálculo preliminar automático por fck, bitola, aço e condição de aderência; cenários de α₀t apresentados nos resultados.
2. Ancoragem com gancho — geometria do arco e prolongamento.
3. Dobras — raio e comprimento de arco pelo eixo da barra.
4. Distribuição reta — quantidade e espaçamento efetivo.
5. Distribuição circular — quantidade, passo no arco e ângulo.
6. Espiral de estaca — comprimento helicoidal e peso estimado.
7. Telas soldadas — massa por área e aço teórico por direção.
8. Distribuição em vigas — pré-verificação simplificada de acomodação em camadas.
9. Conversão de bitolas — equivalência geométrica de área.

## Publicar no repositório existente
1. Abra `https://github.com/englucianoreichert-svg/SIA-ARMADURAS`.
2. Confirme que o repositório está correto e que possui permissão de escrita.
3. Envie o conteúdo desta pasta para a raiz da branch principal (`main`), preservando a estrutura:
   - `index.html`
   - `assets/style.css`
   - `js/app.js`
4. No GitHub, abra **Settings → Pages**.
5. Em **Build and deployment**, selecione **Deploy from a branch**.
6. Selecione branch `main` e pasta `/ (root)`, depois salve.
7. Aguarde a publicação. O endereço esperado é:
   `https://englucianoreichert-svg.github.io/SIA-ARMADURAS/`

Se o repositório tiver arquivos próprios, não os apague sem conferir. Faça upload dos arquivos do SIA preservando o conteúdo existente.

## Executar localmente
Basta abrir `index.html` em um navegador moderno. Não há dependências externas nem etapa de build.

## Dados
Os históricos são gravados no `localStorage` do navegador. Use **Exportar dados** para gerar um backup JSON e **Importar dados** para restaurá-lo em outro navegador.

## Limitações técnicas importantes
Esta versão é um protótipo computacional inicial, não um software de dimensionamento estrutural certificado. Os cálculos são deliberadamente identificados como estimativas ou verificações preliminares. Antes de uso em projeto executivo:
- conferir os critérios e coeficientes com as normas ABNT vigentes e suas erratas;
- inserir tabelas comerciais oficiais de fabricantes;
- validar cada módulo com exemplos de referência independentes;
- revisar especialmente emendas, ancoragens, ganchos e distribuição de armaduras em vigas;
- exigir aprovação do engenheiro responsável para substituição de bitolas ou alteração de detalhamento.

## Próximas etapas recomendadas
- Banco de dados normativo versionado e auditável.
- Cadastro de projetos, elementos e revisões.
- Exportação de relatórios PDF.
- Desenhos técnicos SVG com cotas e identificação das barras.
- Intercâmbio JSON com rotinas AutoLISP para AutoCAD 2025.
- Testes automatizados dos cálculos.
\n\n### Nota sobre bitolas padronizadas\nA lista de seleção utiliza 5; 6,3; 8; 10; 12,5; 16; 20; 25; 32; 40 mm. O diâmetro nominal de 32 mm é mantido na série padronizada; 30 mm não deve ser apresentado como bitola nominal padronizada sem especificação particular do produto.\n\n\n## Versão 1.0 — Módulo 03\n- Módulo 03 configurado para armaduras longitudinais.\n- Removidos os campos manuais de diâmetro interno do pino e ponta reta.\n- Diâmetro mínimo do pino calculado pela Tabela 9.1 da ABNT NBR 6118:2023 conforme bitola e aço.\n- Ponta reta mínima calculada automaticamente: 2φ (gancho semicircular), 4φ (ângulo interno de 45°) ou 8φ (ângulo reto).\n

## Versão 1.0
- Campo fck incluído em todos os nove módulos, com seleção 9, 12, 15, 20, 25, 30, 35, 40, 45 e 50 MPa.
- fck aparece nos resultados de todos os módulos. Nos módulos sem fórmula dependente de fck, o valor é identificado como dado do concreto e não altera o cálculo.
- fck abaixo de 20 MPa gera alerta para revisão do enquadramento normativo.
