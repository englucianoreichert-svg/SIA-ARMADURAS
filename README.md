# SIA — Sistema Integrado de Armaduras

Aplicação web estática (HTML, CSS e JavaScript), preparada para publicação no GitHub Pages.

## Módulos da versão inicial
1. Emendas por traspasse — estimativa com comprimento básico e fator informado.
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
