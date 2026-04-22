# Tasques-amb-Grafics
Pagina web per aplicar tasques i generar un grafic amb chart.js

## Funcionament de la prova:
+ Inici de la tasca: 15 d’abril<br>
+ Data límit d’entrega: 30 d’abril<br>
+ No es pot fer ús de cap intel·ligència artificial.<br>

## S'ha d'entregar:
+ Projecte complet amb arxius HTML, JS i CSS.<br>
+ S’ha de poder veure a través de Github pages.<br>

## Enunciat
Desenvolupar una aplicació web modular que permeti planificar, gestionar i fer seguiment
de tasques personals mitjançant formularis, visualització gràfica i persistència de dades.
Aquesta aplicació simula un gestor personal d’activitats, posant en pràctica tots els
coneixements apresos durant el curs.

## Requisitsi funcionalitats minims

L’aplicació ha d’estar composta per **3 pàgines HTML** amb les funcionalitats següents:

### index.html – Vista principal

+ Ha de tenir un menú de navegació.<br>
+ Mostra un llistat de totes les activitats.<br>
+ Permet:<br>
● crear, eliminar, marcar com a realitzades.<br>
+ Mostra un gràfic amb Chart.js amb les tasques realitzades per mes.<br>
+ Carrega les activitats des de:<br>
● localStorage<br>
● un fitxer activitats.json (importació amb fetch(), evitant duplicats).

### crear-tasca.html – Formulari per afegir activitats

+ Ha de tenir un menú de navegació.<br>
+ Inclou un formulari amb validació:<br>
● títol, descripció, data, categoria (selector de categories), prioritat (selector de Baixa,
Mitjana, Alta)<br>

+ Guarda les activitats a localStorage amb un id únic amb el format “task-001” i el camp
realitzada: false.

### categories.html – Gestor de categories

+ Ha de tenir un menú de navegació.
+ Permet afegir i eliminar categories que es poden usar al formulari.
+ Les categories es guarden a localStorage.

## Rubrica

|   **Criteri**                               | **Punts**|  **HTML(20%)** |  **CSS(20%)**  |  **JS(60%)**   |
|---------------------------------------------|----------|----------------|----------------|----------------|
|   Llistat i gestió de tasques (CRUD)        | 2        |  0.4           |  0.4           |  1.2           |
|   Formulari funcional i validació           | 2        |  0.4           |  0.4           |  1.2           |
|   Marcatge i gestió de tasques realitzades  | 1        |  0.2           |  0             |  0.8           |
|   Gràfic funcional amb Chart.js             | 1        |  0.1           |  0.1           |  0.8           |
|   Importació amb fetch() i JSON             | 1        |  0             |  0             |  1             |
|   Gestió de categories                      | 1        |  0.2           |  0.2           |  0.6           |
|   Estructura en mòduls i netedat de codi    | 1        |  0.1           |  0             |  0.9           |
|   Disseny visual i usabilitat               | 1        |  0.2           |  0.8           |  0             |
|   **Total**                                 | **10**   |  **1.6**       |  **2.0**       |  **6.4**       |