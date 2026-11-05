# SIA — Sistema Integrado de Armaduras

**Versão 1.5.1**

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


## Versão 1.1
- Lista de fck reescrita com opções HTML explícitas de 9, 12 e 15 MPa, além das demais classes.
- Parâmetro de versão no carregamento de `app.js` para evitar que o navegador reutilize o JavaScript antigo em cache.


## Versão 1.2
- Módulo 05 — Distribuição circular: ângulo inicial (graus) definido como 360° por padrão.


## Versão 1.3
- Módulo 05 — Distribuição circular: raio da distribuição definido como 100 cm por padrão; ângulo inicial permanece em 360°.


## Versão 1.4
- Módulo 05 — Distribuição circular: removido o campo fck dos dados de entrada e da saída de resultados, pois não participa do cálculo geométrico.
- Mantidos raio padrão de 100 cm e ângulo inicial padrão de 360°.


## Pacote restaurado — versão 1.4 sem desenhos ilustrativos
- Removidos os esquemas SVG adicionados na versão experimental 1.4.1.
- Mantidos os módulos, campos, cálculos e padrões da versão 1.4.

## Versão 1.5 — Módulo 07: Telas soldadas
- Removido o fck dos dados de entrada do módulo.
- Seleção da família Q, T, L, R ou M, seguida da numeração disponível no catálogo.
- Inserido catálogo técnico de telas Gerdau com diâmetros, espaçamentos, áreas de aço e massa nominal.
- Removidos os campos manuais de massa, diâmetros e espaçamentos.
- Mantidos como entradas a área aplicada (m²) e o acréscimo estimado (%), com padrão de 10% editável.
- Resultados apresentam área e massa sem acréscimo e com acréscimo, além dos dados técnicos da tela.
- Incluída referência de painéis equivalentes pela área nominal de 2,45 × 6,00 m; não representa paginação executiva.
- Fonte de referência do catálogo: Catálogo Gerdau Construção Civil — Tela Soldada Nervurada (https://gsn.gerdau.com/sites/gsn_gerdau/files/downloadable_files/Cat%C3%A1logo%20Constru%C3%A7%C3%A3o%20Civil.pdf)
- O acréscimo percentual é estimativa de consumo definida pelo usuário, não exigência normativa. Para áreas irregulares, o quantitativo real depende de paginação, recortes e sobreposições.


## Versão 1.5.1 — Correção do catálogo de telas (Módulo 07)
- Conferência do catálogo contra o catálogo oficial Gerdau (Construção Civil).
- Removidas 16 designações inexistentes no catálogo Gerdau: Q 166, 238, 385, 709; T 166, 238, 385; L 166, 238, 385, 709; R 166, 238; M 166, 238, 385.
- Incluídas 16 designações que faltavam: Q 159, 246, 396, 636; T 159, 246, 396; L 159, 246, 396, 636; R 159, 246; M 159, 246, 396.
- Catálogo completo com 46 telas: Q (14), T (10), L (11), R (5) e M (6).
- Corrigida a área de aço transversal de R 196 (1,30), R 283 (1,88) e M 283 (1,41 cm²/m).
- Cabeçalho do README e identificação de versão na página atualizados.
