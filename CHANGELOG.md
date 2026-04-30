## [0.0.0] - 2026-04-25
### INFRA
- Criada a infra estrutura do APP
- Banco de dados
- Layout
- Arquitetura

## [0.0.0] - 2026-04-25
Agora queremos que vc atualize o app... precisamos que ele tenha uma cara de app nativo para desktop com linhas quadradas e finas. A paleta de cores deve ser muito sutil. Também queremos temas alternados.
O que precisamos... siga a adr000 e o prompt_mestre para respeitar a estrutura de arquivos e divisão de responsabilidades do app
Depois de definir um layout melhor, queremos que altere a forma de adicionar uma nova turma incluindo a data de inicio dela. Toda turma inicia na segunda-feira. EER tem duração de 8 semanas e vai até o domingo da 8a semana. O input deve ter isso automaticamente ao ciar uma turma. A EAC e a PSS sao de 6 dias iniciando na segunda e terminando no sábado. Depois de criar o nova turma deve imediatamente ir para o dashboard principal onde vamos ter a nav bar google na margem esquerda que nao sobrepõe a div principal, ela divide. Quando recuada aparece apenas os icones, quando estendida os nomes completos após os icones.
Precisamos ser o mais clean o possivel e nao criar cores de mais pra botões. Todos os botões devem ter o mesmo padrao, menos os de danger, close, excluir, deletar... estes serão de uma paleta vermelha.
Helder... bem fininho, o suficiente pra incluir os botões de close/ minimizar e expandir nativos do mac. Ao centro e bem pequeno o nome e logotipo do app EB - Escolas Bíblicas
na navegação do dashboard termos a principio o titulo da turma (como   projeto no dashboard do GCP) sendo possivel alterar ou criar um novo ao clicar vai aparecer um select com a listagem das turmas. Sigla (EER/ PSS/ EAC - descrição. data de início e conclusão logo a baixo small). Isso fica em um quadrado. Abaixo a lista de links sem dividir com linhas... houver na div, ai sim a div altera de cor. nao queremos nada com formato de botao, mas clean tipo vscode.
Apenas dois temas, dart e claro. Isso fica em config
teremos na nav
Turma (onde pode editar nome, descrição mas nao o tipo EEA/ EER/ PSS. Mas data de inicio tb pode alterar. Data de conclusão mantem automática.
Instrutores: Adicionar/editar nome do Instrutor A e Instrutor B e inserir mais instrutores convidados ou substitutos ou em treinamento
Alunos: LIsta de alunos. Podemos adicionar um a um ou um json com todos os alunos. Inclui Nome completo, Contato, Congregação, Privilegios (para homens e mulheres: pioneiro regular ou pioneiro especial, ou missionário em campo ou betelita; para homens: os mesmos das mulheres com adicional eles podem ter uma das outras opções e ao mesmo tempo ser servo ministerial ou ancião. Nao pode ter nenhum dos outros e ser superintendente de circuito. Um superintendente de circuito sempre é tambem anciao)
Adicionar conjuge faz um relacionamento entre pessoas de sexo oposto. Em adicionar cônjuge selecionar ou criar um novo aluno cônjuge (só é válido para EER e PSS. EAC é só para anciãos e nao as esposas nao participam)
Grade: Aqui teremos a inclusão das matérias dos cursos: Para EER cada dia tem 4 aulas. De segunda a sexta. Sábado e domingo nao entram na grade. Para PSS e EAC sao 6 aulas por dia. No sábado 5 aulas. O usuario do sistema vai incluir o nome das aulas que será uma lista vazia de 1 até a quantidade matemática total das aulas. 
Designações: Depois ele pode adicionar designações para cada aula. Ele pode escolher um aluno ou um grupo de alunos (baseado no perfil: casal, irmãos (uma pessoa do sexo masculino), irmã (uma pessoa do sexo feminino), irmão solteiro, irmã solteira)
Ele vai adicionar na designação o tipo de designação, o Tema, tempo em minutos, Participantes e o perfil dos participantes (a quantidade de cada perfil mencionado anteriormente), A descrição. Se houver a fonte de matéria pode adicionar mas nao é obrigatório
A designação pode ser: Comentário, Demonstração, monólogo, discurso, consideração, relatório. Ou uma demonstração com monólogo.
Apenas homens podem fazer discurso, relatório, consideração. O restante pode ser qualquer sexo.