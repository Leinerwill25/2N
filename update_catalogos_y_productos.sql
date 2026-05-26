-- SQL Migration: Update Catalogs and Products from USOS Y POSOLOGÍA 2N.xlsx
-- Warning: This script deletes ALL existing products and catalogs!

BEGIN;

-- 1. Delete all existing records
DELETE FROM productos;
DELETE FROM catalogos;

-- 2. Insert new Catalogs
INSERT INTO catalogos (nombre, descripcion, activo) VALUES
  ('Línea Analgésica Antiinflamatoria', 'Productos farmacéuticos de la línea analgésica antiinflamatoria de 2N', true),
  ('Línea Antibiótica', 'Productos farmacéuticos de la línea antibiótica de 2N', true),
  ('Línea Antiespasmódica', 'Productos farmacéuticos de la línea antiespasmódica de 2N', true),
  ('Línea Antihistamínica', 'Productos farmacéuticos de la línea antihistamínica de 2N', true),
  ('Línea Antimicótica', 'Productos farmacéuticos de la línea antimicótica de 2N', true),
  ('Línea Antiparasitaria', 'Productos farmacéuticos de la línea antiparasitaria de 2N', true),
  ('Línea Antivirales', 'Productos farmacéuticos de la línea antivirales de 2N', true),
  ('Línea Cardiometabólica', 'Productos farmacéuticos de la línea cardiometabólica de 2N', true),
  ('Línea Gastrointestinal', 'Productos farmacéuticos de la línea gastrointestinal de 2N', true),
  ('Línea Metabólica', 'Productos farmacéuticos de la línea metabólica de 2N', true),
  ('Línea Salud Femenina', 'Productos farmacéuticos de la línea salud femenina de 2N', true),
  ('Línea Salud Ocular', 'Productos farmacéuticos de la línea salud ocular de 2N', true),
  ('Línea Salud Respiratoria', 'Productos farmacéuticos de la línea salud respiratoria de 2N', true),
  ('Línea Salud Sexual', 'Productos farmacéuticos de la línea salud sexual de 2N', true),
  ('Línea Sistema Nervioso', 'Productos farmacéuticos de la línea sistema nervioso de 2N', true),
  ('Línea Vitaminas y Minerales', 'Productos farmacéuticos de la línea vitaminas y minerales de 2N', true);

-- 3. Insert Products by Catalog
-- --- LÍNEA: LÍNEA ANALGÉSICA ANTIINFLAMATORIA (11 productos) ---
INSERT INTO productos (catalogo_id, nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo)
SELECT
  (SELECT id FROM catalogos WHERE nombre = 'Línea Analgésica Antiinflamatoria' LIMIT 1),
  v.nombre, v.principio_activo, v.presentacion, v.linea, v.precio, v.moneda, v.stock, v.descripcion, v.activo
FROM (VALUES
  ('DOFLEX', 'DICLOFENAC DIELTILAMINO GEL BP 1.16% X 30GR', 'Gel 30g', 'Línea Analgésica Antiinflamatoria', 0::numeric, 'USD', 0, 'Indicaciones: Alivio local del dolor y la inflamación por contusiones, esguinces, torceduras y artrosis.
Posología: Masajear suavemente de 3 a 4 veces al día en la zona del dolor.', true),
  ('DOFLEX', 'DICLOFENAC POTASICO 50MG X 20 TAB', '20 Tabletas', 'Línea Analgésica Antiinflamatoria', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento a corto plazo del dolor agudo, inflamación postraumática, dental o menstrual.', true),
  ('FENAMAX', 'ACETAMINOFEN 500 MG X 10 TAB', '10 Tabletas', 'Línea Analgésica Antiinflamatoria', 0::numeric, 'USD', 0, 'Indicaciones: Alivio del dolor de intensidad leve a moderada (cefaleas, dolor dental) y reducción de fiebre.', true),
  ('FENAMAX FORTE', 'ACETAMINOFEN 650 MG X 10 TAB', '10 Tabletas', 'Línea Analgésica Antiinflamatoria', 0::numeric, 'USD', 0, 'Indicaciones: Mayor potencia analgésica para cuadros febriles altos, dolores musculares o articulares agudos.', true),
  ('IBUSIC', 'IBUPROFENO 100MG/5MLX 120ML', 'Jarabe 120ml', 'Línea Analgésica Antiinflamatoria', 0::numeric, 'USD', 0, 'Indicaciones: Antipirético y analgésico infantil para el alivio de fiebre, dolor de oído o dentición.', true),
  ('IBUSIC', 'IBUPROFENO 800MG X 10 TAB', '10 Tabletas', 'Línea Analgésica Antiinflamatoria', 0::numeric, 'USD', 0, 'Indicaciones: Antiinflamatorio y analgésico potente para artritis, dolores severos osteomusculares.', true),
  ('KETOSIC', 'KETOPROFENO 100 MG X 10 TAB', '10 Tabletas', 'Línea Analgésica Antiinflamatoria', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento del dolor agudo inflamatorio, reumatismos y dolor postoperatorio.', true),
  ('LEVIXAM', 'MELOXICAM 15 MG X 10 TAB', '10 Tabletas', 'Línea Analgésica Antiinflamatoria', 0::numeric, 'USD', 0, 'Indicaciones: Alivio sintomático de la artrosis, artritis reumatoide y afecciones de columna.', true),
  ('MEFEDOL', 'ÀCIDO MEFENAMICO 500MG X 10 TAB', '10 Tabletas', 'Línea Analgésica Antiinflamatoria', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento del dolor menstrual (dismenorrea) y dolores musculoesqueléticos menores.', true),
  ('NAPSIC', 'NAPROXENO 500MG X 10 TAB', '10 Tabletas', 'Línea Analgésica Antiinflamatoria', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de inflamación articular, dolores musculares, tendinitis y migrañas.', true),
  ('PEDIAFEN FORTE', '180MG/5ML X 120 ML ACETAMINOFEN', 'Jarabe 120ml', 'Línea Analgésica Antiinflamatoria', 0::numeric, 'USD', 0, 'Indicaciones: Antipirético y analgésico infantil de mayor concentración para el manejo de la fiebre.', true)
) AS v(nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo);

-- --- LÍNEA: LÍNEA ANTIBIÓTICA (18 productos) ---
INSERT INTO productos (catalogo_id, nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo)
SELECT
  (SELECT id FROM catalogos WHERE nombre = 'Línea Antibiótica' LIMIT 1),
  v.nombre, v.principio_activo, v.presentacion, v.linea, v.precio, v.moneda, v.stock, v.descripcion, v.activo
FROM (VALUES
  ('AZITROMICINA', '500MG X 3 TAB', '3 Tabletas', 'Línea Antibiótica', 0::numeric, 'USD', 0, 'Indicaciones: Infecciones del tracto respiratorio, amigdalitis, infecciones de la piel y clamidia.', true),
  ('BACEF', 'CEFIXIMA 100MG/5ML X 60ML', 'Polvo para suspensión', 'Línea Antibiótica', 0::numeric, 'USD', 0, 'Indicaciones: Cefalosporina para infecciones urinarias, otitis media y bronquitis bacteriana aguda.', true),
  ('BACEF', 'CEFIXIMA 400MG X 5 TAB', '5 Tabletas', 'Línea Antibiótica', 0::numeric, 'USD', 0, 'Indicaciones: Antibiótico para infecciones respiratorias altas, urinarias complicadas y gonorrea no complicada.', true),
  ('BACIX', 'BACITRACINA 500UI X 15 GR', 'Crema x 15g', 'Línea Antibiótica', 0::numeric, 'USD', 0, 'Indicaciones: Antibiótico tópico para prevenir o tratar infecciones en heridas, raspaduras o quemaduras leves.', true),
  ('BACLEV', 'LEVOFLOXACINA 500MG X 10TAB', '10 Tabletas', 'Línea Antibiótica', 0::numeric, 'USD', 0, 'Indicaciones: Infecciones bacterianas complejas del pulmón, senos paranasales, riñones y próstata.', true),
  ('BACXIN', 'AMOXICILINA 250MG/5ML X 100 ML', 'Polvo para suspensión', 'Línea Antibiótica', 0::numeric, 'USD', 0, 'Indicaciones: Infecciones bacterianas del oído, nariz, garganta, tracto urinario y piel.', true),
  ('CETROX', 'CEFTRIAXONA 1G 1AMP', 'Ampolla', 'Línea Antibiótica', 0::numeric, 'USD', 0, 'Indicaciones: Antibiótico inyectable para infecciones sistémicas severas o profilaxis quirúrgica.', true),
  ('CIPROFLOXACINA', '200MG/ 100ML X 100ML SOLUC INY', 'Solución Intravenosa 100ml', 'Línea Antibiótica', 0::numeric, 'USD', 0, 'Indicaciones: Infecciones bacterianas sistémicas graves, urinarias complicadas, óseas y abdominales.', true),
  ('CIPROXIN', 'CIPROFLOXACINA 500 MG X 10 TAB', '10 Tabletas', 'Línea Antibiótica', 0::numeric, 'USD', 0, 'Indicaciones: Fluoroquinolona para infecciones urinarias, gastrointestinales (diarrea bacteriana) y sinusitis.', true),
  ('CLAVUMAX PLUS', 'AMOXICILINA+ AC 875MG/ 125MG X 10 TAB', '11 Tabletas', 'Línea Antibiótica', 0::numeric, 'USD', 0, 'Indicaciones: Antibiótico reforzado para infecciones respiratorias severas, otitis, neumonía y mordeduras.', true),
  ('CLINDAMICINA', '300MG X 10 CAP', '10 Cápsulas', 'Línea Antibiótica', 0::numeric, 'USD', 0, 'Indicaciones: Infecciones por bacterias anaerobias, infecciones ginecológicas, óseas y de tejidos blandos.', true),
  ('DECUTEN', 'CLOTRI+NEO+DEXA 20MG CREMA', 'Crema 20g', 'Línea Antibiótica', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de afecciones de piel que causaninflamación, infección bacteriana y micótica.', true),
  ('DROFAXIL', 'CEFADROXILO 500MG X 10CAP', '10 Cápsulas', 'Línea Antibiótica', 0::numeric, 'USD', 0, 'Indicaciones: Infecciones de la piel, amigdalitis bacteriana e infecciones del tracto urinario no complicadas.', true),
  ('MOX', 'AMOXICILINA 500 MG X 10 TAB', '10 Tabletas', 'Línea Antibiótica', 0::numeric, 'USD', 0, 'Indicaciones: Antibiótico para infecciones respiratorias, dentales y urinarias comunes.', true),
  ('MOXPLUS', 'AMOXIC + ACIDO CLAVULÁNICO 600MG+ 42.9MG+5ML X 60ML', 'Polvo para suspensión', 'Línea Antibiótica', 0::numeric, 'USD', 0, 'Indicaciones: Suspensión antibiótica de alta concentración para infecciones respiratorias u óticas infantiles.', true),
  ('QUEMADERM', 'SULFADIAZINA DE PLATA 1% 30GR', 'crema 30g', 'Línea Antibiótica', 0::numeric, 'USD', 0, 'Indicaciones: Prevención y tratamiento de infecciones bacterianas en quemaduras de piel.', true),
  ('TRIZOLBAC', 'METRONIDAZOL SOL INYE 500MG X 100ML', 'Solución Intravenosa 100ml', 'Línea Antibiótica', 0::numeric, 'USD', 0, 'Indicaciones: Infecciones graves por bacterias anaerobias', true),
  ('ZINATROX', 'AZITROMICINA 200MG/5ML X 15ML', 'Polvo para suspensión', 'Línea Antibiótica', 0::numeric, 'USD', 0, 'Indicaciones: Suspensión antibiótica para infecciones de vías respiratorias infantiles.', true)
) AS v(nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo);

-- --- LÍNEA: LÍNEA ANTIESPASMÓDICA (1 productos) ---
INSERT INTO productos (catalogo_id, nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo)
SELECT
  (SELECT id FROM catalogos WHERE nombre = 'Línea Antiespasmódica' LIMIT 1),
  v.nombre, v.principio_activo, v.presentacion, v.linea, v.precio, v.moneda, v.stock, v.descripcion, v.activo
FROM (VALUES
  ('UROXAT', 'FLAVOXATE 200MG X 10TAB', '10 Tabletas', 'Línea Antiespasmódica', 0::numeric, 'USD', 0, 'Indicaciones: Espasmolítico de las vías urinarias; alivia la disuria, urgencia miccional y cistitis.', true)
) AS v(nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo);

-- --- LÍNEA: LÍNEA ANTIHISTAMÍNICA (6 productos) ---
INSERT INTO productos (catalogo_id, nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo)
SELECT
  (SELECT id FROM catalogos WHERE nombre = 'Línea Antihistamínica' LIMIT 1),
  v.nombre, v.principio_activo, v.presentacion, v.linea, v.precio, v.moneda, v.stock, v.descripcion, v.activo
FROM (VALUES
  ('CIZTAMIN', 'CETIRIZINA 10MG X 10 TAB', '10 Tabletas', 'Línea Antihistamínica', 0::numeric, 'USD', 0, 'Indicaciones: Alivio de síntomas de rinitis alérgica estacional, conjuntivitis y urticaria idiopática.', true),
  ('HEPTADEX', 'CIPROHEPTADINA 4MG + DEXAMETASONA 0,25MG X 30TAB', '30 Tabletas', 'Línea Antihistamínica', 0::numeric, 'USD', 0, 'Indicaciones: Estimulante del apetito y antihistamínico para estados de desnutrición o convalecencia.', true),
  ('HIDEST', 'DESLORATADINA 5MG X 10 TAB', '10 Tabletas', 'Línea Antihistamínica', 0::numeric, 'USD', 0, 'Indicaciones: Antihistamínico de larga duración no somnoliento para rinitis y alergias cutáneas.', true),
  ('LORASMIN', 'LORATADINA 10MG X 10 TAB', '10 Tabletas', 'Línea Antihistamínica', 0::numeric, 'USD', 0, 'Indicaciones: Alivio de los síntomas de alergias respiratorias o de piel.', true),
  ('LORASMIN', 'LORATADINA 5MG/5ML X 60ML', 'Jarabe 60ml', 'Línea Antihistamínica', 0::numeric, 'USD', 0, 'Indicaciones: Antihistamínico en jarabe infantil para procesos alérgicos.', true),
  ('TOXALERG', 'AMBROXOL CLORHIDRATO+ LORAT 30 MG/5ML X 120 ML', 'Jarabe 120ml', 'Línea Antihistamínica', 0::numeric, 'USD', 0, 'Indicaciones: Combinación mucolítica y antihistamínica para tos con flema de origen alérgico.', true)
) AS v(nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo);

-- --- LÍNEA: LÍNEA ANTIMICÓTICA (4 productos) ---
INSERT INTO productos (catalogo_id, nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo)
SELECT
  (SELECT id FROM catalogos WHERE nombre = 'Línea Antimicótica' LIMIT 1),
  v.nombre, v.principio_activo, v.presentacion, v.linea, v.precio, v.moneda, v.stock, v.descripcion, v.activo
FROM (VALUES
  ('COFLUX', 'FLUCONAZOL150 MG X 1 CAP', '1 Cápsula', 'Línea Antimicótica', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento sistémico de afecciones causados por hongos.', true),
  ('ZOLCUTEN', 'KETACONAZOL SHAMPOO 60ML', 'Frasco 60ml', 'Línea Antimicótica', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de la dermatitis seborreica severa del cuero cabelludo y la caspa rebelde.', true),
  ('ZOLCUTEN', 'KETOCONAZOL CREMA BP2% W/W X 20 GR', 'crema 20g', 'Línea Antimicótica', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de infecciones por hongos en la piel como tiña pedis (pie de atleta), tiña crural.', true),
  ('ZOLCUTEN', 'KETOCONAZOL CREMA BP2% X 30 GR', 'crema 30g', 'Línea Antimicótica', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de infecciones por hongos en la piel como tiña pedis (pie de atleta), tiña crural.', true)
) AS v(nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo);

-- --- LÍNEA: LÍNEA ANTIPARASITARIA (4 productos) ---
INSERT INTO productos (catalogo_id, nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo)
SELECT
  (SELECT id FROM catalogos WHERE nombre = 'Línea Antiparasitaria' LIMIT 1),
  v.nombre, v.principio_activo, v.presentacion, v.linea, v.precio, v.moneda, v.stock, v.descripcion, v.activo
FROM (VALUES
  ('ALBEDOX', 'ALBENDAZOL 200MG X 20 TAB', '20 Tabletas', 'Línea Antiparasitaria', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de parasitosis intestinales simples o mixtas (ascaris, oxiuros, uncinarias).', true),
  ('ALBEDOX', 'ALBENDAZOL 400MG X 10 TAB', '10 Tabletas', 'Línea Antiparasitaria', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de infecciones parasitarias severas o helmintiasis.', true),
  ('ALBEDOX', 'ALBENDAZOL 400MG X 20ML', 'Suspensión 20ml', 'Línea Antiparasitaria', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de infecciones parasitarias severas o helmintiasis.', true),
  ('XONIDAX', 'NITAZOXANIDA 500MG X 6 TAB', '10 Tabletas', 'Línea Antiparasitaria', 0::numeric, 'USD', 0, 'Indicaciones: Antiparasitario contra amebas, giardias, criptosporidiosis y helmintos intestinales.', true)
) AS v(nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo);

-- --- LÍNEA: LÍNEA ANTIVIRALES (2 productos) ---
INSERT INTO productos (catalogo_id, nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo)
SELECT
  (SELECT id FROM catalogos WHERE nombre = 'Línea Antivirales' LIMIT 1),
  v.nombre, v.principio_activo, v.presentacion, v.linea, v.precio, v.moneda, v.stock, v.descripcion, v.activo
FROM (VALUES
  ('CLOVIDOX', 'ACICLOVIR 400 MG X 10 TAB', '10 Tabletas', 'Línea Antivirales', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de infecciones por virus del Herpes Simple cutáneo, genital y Varicela-Zóster.', true),
  ('CLOVIDOX', 'ACICLOVIR 5% 10 GR CREMA', 'Crema x 10g', 'Línea Antivirales', 0::numeric, 'USD', 0, 'Indicaciones: Alivio local de los síntomas del herpes labial o genital inicial y recurrente.', true)
) AS v(nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo);

-- --- LÍNEA: LÍNEA CARDIOMETABÓLICA (29 productos) ---
INSERT INTO productos (catalogo_id, nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo)
SELECT
  (SELECT id FROM catalogos WHERE nombre = 'Línea Cardiometabólica' LIMIT 1),
  v.nombre, v.principio_activo, v.presentacion, v.linea, v.precio, v.moneda, v.stock, v.descripcion, v.activo
FROM (VALUES
  ('ALDOSPIR', 'ESPIRONOLACTONA 25MG X10TAB', '10 Tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Diurético ahorrador de potasio para insuficiencia cardíaca, hipertensión y edema por cirrosis.', true),
  ('CORDEX', 'DEXAMETASONA 8MG / 2ML X 1 AMPOLLA', '1 Ampolla', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Potente antiinflamatorio para shocks anafilácticos, crisis asmáticas agudas y alergias graves.', true),
  ('DIERUTIN', 'HIDROCLOROTIAZIDA 12,5MG X 30TAB', '30 Tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Diurético tiazídico para el tratamiento de la hipertensión arterial esencial.', true),
  ('DIERUTIN', 'HIDROCLOROTIAZIDA 25MG X 30TAB', '30 Tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Diurético tiazídico para el tratamiento de la hipertensión arterial esencial.', true),
  ('DIUMED', 'FUROSEMIDA 20MGX 30TAB', '30 Tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Diurético de asa para el tratamiento de edemas por falla cardíaca, renal o hepática.', true),
  ('DOSVAL', 'VALSARTAN 160MG X 10 TAB', '10 Tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Antagonista ARA-II para hipertensión arterial, insuficiencia cardíaca y post-infarto.', true),
  ('FLADION', 'DIOSMINA 450 MG + HESPERIDINA 50 MG X10 TAB', '10 Tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de la insuficiencia venosa crónica (várices, piernas cansadas) y crisis hemorroidales.', true),
  ('GLUCODAP', 'DAPAGLIFOZIN 10MG X 30TAB', '30 tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Inhibidor SGLT2 para control glucémico y reducción de riesgo de falla cardíaca.', true),
  ('HIPERTAN', 'LOSARTAN POTASICO 100MG X 30 TAB', '30 tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de la hipertensión arterial y protección renal en pacientes diabéticos.', true),
  ('HIPERTAN', 'LOSARTAN POTASICO 50MG X 30 TAB', '30 tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Control de la presión arterial alta de inicio o mantenimiento.', true),
  ('ISOR', 'ISOSORBIDE DINITRATO 10MG X 10 TAB', '10 Tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Preventivo de ataques de angina de pecho.', true),
  ('LATICAR', 'CARVEDILOL 12.5MG X 30 TAB', '30 Tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Betabloqueante para hipertensión arterial e insuficiencia cardíaca congestiva crónica.', true),
  ('LATICAR', 'CARVEDILOL 6.25MG X 30 TAB', '30 Tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Dosis de inicio para el tratamiento de la hipertensión o falla cardíaca.', true),
  ('LATIPROL', 'BISOPROLOL 2,5MG X 10 TAB', '10 Tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de la hipertensión arterial y cardiopatía isquémica (dosis de inicio).', true),
  ('LATIPROL', 'BISOPROLOL 5 MG X 10 TAB', '10 Tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Control de mantenimiento para la presión arterial y frecuencia cardíaca.', true),
  ('NIFPRES', 'NIFEDIPINA L.P 20MG X 30 TAB', '30 Tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Calcioantagonista de liberación prolongada para hipertensión y angina de pecho crónica.', true),
  ('NIFPRES', 'NIFEDIPINA L.P 30MG X 30 TAB', '30 Tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento y control de mantenimiento de la presión arterial severa.', true),
  ('NISOLCORT', 'PREDNISONA 3MG/5ML X 60ML', 'Jarabe 60ml', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Corticoide oral en jarabe para procesos inflamatorios o alérgicos agudos infantiles.', true),
  ('NISOLCORT', 'PREDNISONA MG X 10 TAB', '10 Tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de enfermedades autoinmunes, reumáticas, asmáticas e inflamaciones severas.', true),
  ('PRILCAP', 'CAPTOPRIL 25MG X 30 TAB', '30 tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de hipertensión arterial e inicio regulado post-infarto.', true),
  ('PRILCAP', 'CAPTOPRIL 50 MG X 30 TAB', '30 tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de la hipertensión arterial, insuficiencia cardíaca y emergencias hipertensivas.', true),
  ('PRILTENS', 'ENALAPRIL 20 MG X 30 TAB', '30 tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Inhibidor de la ECA para el tratamiento de la hipertensión arterial sistémica.', true),
  ('PRILTENS', 'ENALAPRIL10MG X30 TAB', '30 tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Inhibidor de la ECA para el tratamiento de la hipertensión arterial sistémica.', true),
  ('ROVESTIN', 'ROSUVASTATINA 20MG X 10 TAB', '10 Tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Estatina para reducir niveles elevados de colesterol, triglicéridos y riesgo cardiovascular.', true),
  ('TENSOLM', 'OLMESARTAN MEDOXOMIL 20MG X 30 TAB', '30 Tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Antagonista ARA-II para el manejo de la hipertensión arterial.', true),
  ('TENSOLM', 'OLMESARTAN MEDOXOMIL 40MG X 30 TAB', '30 Tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Control de pacientes con hipertensión arterial que requieren dosis máximas de sostén.', true),
  ('TRIAMCINOLONA', '0.1% CREMA X 25 GR', 'crema 25g', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de afecciones cutáneas inflamatorias o pruriginosas (eccemas, psoriasis).', true),
  ('XARIBAX', 'RIVAROXABAN 15MG X 10TAB', '10 Tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Anticoagulante oral para prevención de accidentes cerebrovasculares o trombosis venosa.', true),
  ('XARIBAX', 'RIVAROXABAN 20MG X 10 TAB', '10 Tabletas', 'Línea Cardiometabólica', 0::numeric, 'USD', 0, 'Indicaciones: Anticoagulación y prevención de tromboembolismo venoso recurrente.', true)
) AS v(nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo);

-- --- LÍNEA: LÍNEA GASTROINTESTINAL (12 productos) ---
INSERT INTO productos (catalogo_id, nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo)
SELECT
  (SELECT id FROM catalogos WHERE nombre = 'Línea Gastrointestinal' LIMIT 1),
  v.nombre, v.principio_activo, v.presentacion, v.linea, v.precio, v.moneda, v.stock, v.descripcion, v.activo
FROM (VALUES
  ('COLBUTIN', 'TRIMEBUTINA 200MG 1 X10 TAB', '10 Tabletas', 'Línea Gastrointestinal', 0::numeric, 'USD', 0, 'Indicaciones: Antiespasmódico y modulador de la motilidad para el Síndrome de Intestino Irritable.', true),
  ('EFERCID', 'BICARBONATO DE SODIO X 10 SOBRES', '10 sobres 5g', 'Línea Gastrointestinal', 0::numeric, 'USD', 0, 'Indicaciones: Antiacido sistémico para el alivio rápido de la acidez estomacal, pirosis e indigestión.', true),
  ('ESTRICOL', 'POLIETILENGLICOL X 10 SOBRES', '10 sobres 8,5g', 'Línea Gastrointestinal', 0::numeric, 'USD', 0, 'Indicaciones: Laxante osmótico para el tratamiento del estreñimiento crónico u ocasional.
Posología: Disolver 1 sobre en un vaso de agua o jugo una vez al día.', true),
  ('EVIFLAT', 'SIMETICONA 125MG X 10 CAP BLANDAS', '10 Cápsulas blandas', 'Línea Gastrointestinal', 0::numeric, 'USD', 0, 'Indicaciones: Alivio de la acumulación excesiva de gases, meteorismo, distensión abdominal y flatulencias.
Posología: 1 cápsula blanda después de cada comida principal y antes de acostarse.', true),
  ('ICTROMIX', 'SAL DE REHIDRATACIÓN X 10 SOBRES SABOR COCO', '10 sobres', 'Línea Gastrointestinal', 0::numeric, 'USD', 0, 'Indicaciones: Prevención y tratamiento de la deshidratación por diarrea, vómito o sudoración excesiva.
Posología: Disolver 1 sobre en 1/2 litro de agua. Tomar en pequeñas porciones tras cada evacuación.', true),
  ('LOPILAX', 'LOPERAMIDA 2MG X 60 Cap', '60 Cápsulas', 'Línea Gastrointestinal', 0::numeric, 'USD', 0, 'Indicaciones: Control sintomático de la diarrea aguda no infecciosa o diarrea crónica.', true),
  ('NOGASTRIN', 'OMEPRAZOL 20 MG X 30 CAP', '30 cápsulas con microgranulos', 'Línea Gastrointestinal', 0::numeric, 'USD', 0, 'Indicaciones: Protector gástrico para gastritis, reflujo gastroesofágico y úlceras gástricas.
Posología: 1 cápsula en ayunas con un vaso de agua, 30 minutos antes del desayuno.', true),
  ('PURICOL', 'POLIETILENGLICOL+ ELECTROLITOS X 4 SOBRES', '4 sobres de 69,56g', 'Línea Gastrointestinal', 0::numeric, 'USD', 0, 'Indicaciones: Preparación/evacuación del colon para estudios médicos (endoscopia, colonoscopia) o estreñimiento severo.
Posología: Disolver los sobres en agua según indicación de la guía del estudio clínico.', true),
  ('SACOLAX', 'BISACODILO 5MG X 10 TAB', '10 Tabletas', 'Línea Gastrointestinal', 0::numeric, 'USD', 0, 'Indicaciones: Laxante estimulante para el alivio del estreñimiento agudo u ocasional.
Posología: 1 a 2 tabletas (5 mg - 10 mg) por la noche para obtener efecto en la mañana.', true),
  ('VERTEX', 'DIMENHIDRATO 50MG X10 TAB', '10 Tabletas', 'Línea Gastrointestinal', 0::numeric, 'USD', 0, 'Indicaciones: Prevención y alivio de náuseas, vómitos y mareos por movimiento (viajes).
Posología: 1 tableta (50 mg) 30 minutos antes de viajar; se puede repetir cada 4-6 horas.', true),
  ('VIZTOM', 'RANITIDINA 150MG/10ML X 120ML', 'Jarabe 120ml', 'Línea Gastrointestinal', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de la úlcera gástrica activa, duodenal y esofagitis por reflujo.', true),
  ('VIZTOM', 'RANITIDINA 150MG X 10 TAB', '10 Tabletas', 'Línea Gastrointestinal', 0::numeric, 'USD', 0, 'Indicaciones: Reductor de la producción de ácido gástrico en formato líquido para úlceras o reflujo.', true)
) AS v(nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo);

-- --- LÍNEA: LÍNEA METABÓLICA (8 productos) ---
INSERT INTO productos (catalogo_id, nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo)
SELECT
  (SELECT id FROM catalogos WHERE nombre = 'Línea Metabólica' LIMIT 1),
  v.nombre, v.principio_activo, v.presentacion, v.linea, v.precio, v.moneda, v.stock, v.descripcion, v.activo
FROM (VALUES
  ('CONGLIB', 'GLIBENCLAMIDA 5MG X 30TAB', '30 Tabletas', 'Línea Metabólica', 0::numeric, 'USD', 0, 'Indicaciones: Estimulante de secreción de insulina para pacientes con Diabetes Mellitus Tipo 2.', true),
  ('DOSTIROX', 'LEVOTIROXINA 50 MG X 30 TAB', '30 Tabletas', 'Línea Metabólica', 0::numeric, 'USD', 0, 'Indicaciones: Reemplazo hormonal en hipotiroidismo severo o post-tiroidectomía.', true),
  ('DOSTIROX', 'LEVOTIROXINA 100 MG X 30 TAB', '30 Tabletas', 'Línea Metabólica', 0::numeric, 'USD', 0, 'Indicaciones: Dosis de inicio o ajuste fino para el tratamiento del hipotiroidismo.', true),
  ('DOSTIROX', 'LEVOTIROXINA 25MG X 30TAB', '30 Tabletas', 'Línea Metabólica', 0::numeric, 'USD', 0, 'Indicaciones: Terapia de reemplazo hormonal en pacientes con hipotiroidismo primario o secundario.', true),
  ('EMPAREG', 'EMPAGLIFOZINA 10MG X 30TAB', '30 Tabletas', 'Línea Metabólica', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de la Diabetes Tipo 2 y protector renal/cardíaco.', true),
  ('GLICONT', 'METFORMINA 500 MG X 30 TAB', '30 Tabletas', 'Línea Metabólica', 0::numeric, 'USD', 0, 'Indicaciones: Antidiabético para el control de la glucemia en pacientes con Diabetes Mellitus Tipo 2.', true),
  ('GLICONT', 'METFORMINA 850 MG X 30 TAB', '30 Tabletas', 'Línea Metabólica', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de primera línea para Diabetes Tipo 2 y resistencia a la insulina.', true),
  ('SIGAMETT', 'METFORMINA 500MG + SITAGLIPTINA 50MG X 10 TAB', '10 Tabletas', 'Línea Metabólica', 0::numeric, 'USD', 0, 'Indicaciones: Terapia combinada para el control glucémico óptimo en Diabetes Tipo 2.', true)
) AS v(nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo);

-- --- LÍNEA: LÍNEA SALUD FEMENINA (6 productos) ---
INSERT INTO productos (catalogo_id, nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo)
SELECT
  (SELECT id FROM catalogos WHERE nombre = 'Línea Salud Femenina' LIMIT 1),
  v.nombre, v.principio_activo, v.presentacion, v.linea, v.precio, v.moneda, v.stock, v.descripcion, v.activo
FROM (VALUES
  ('DEPRO-GEST', 'MEDROXIPROGESTERONA AMP X 1 ML', 'Ampolla', 'Línea Salud Femenina', 0::numeric, 'USD', 0, 'Indicaciones: Anticonceptivo inyectable de larga duración y tratamiento de la endometriosis.', true),
  ('GINAZOL', 'CLOTRIMAZOL 1% X 50 GR CREMA VAGINAL', 'Crema 50g con 6 aplicadores', 'Línea Salud Femenina', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de la candidiasis vulvovaginal.', true),
  ('GINOTRAZOL', 'METRONIDAZOL 15% + MICONAZOL 4% X 40 GR', 'Cre,a 40g con 7 aplicadores', 'Línea Salud Femenina', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de infecciones vaginales mixtas (vaginosis bacteriana, tricomoniasis y candidiasis).', true),
  ('LEVOFEM', 'LEVONOGESTREL 0,15MG+ ETINILESTRADIOL 0.03MG X 21 TAB', '21 tabletas', 'Línea Salud Femenina', 0::numeric, 'USD', 0, 'Indicaciones: Anticonceptivo hormonal oral regular de toma diaria.', true),
  ('NOR-GYNA', 'NORETISTERONA+ESTRADIOL 50MG X 1ML X 1 AMP', '1 Ampolla', 'Línea Salud Femenina', 0::numeric, 'USD', 0, 'Indicaciones: Anticonceptivo hormonal inyectable mensual.', true),
  ('POSTIFEM', 'LEVONOGES 1.5MG X 1 TAB ACETAMINOFEN', '1 tableta', 'Línea Salud Femenina', 0::numeric, 'USD', 0, 'Indicaciones: Anticonceptivo de emergencia ("pastilla del día después") post-coito no protegido.', true)
) AS v(nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo);

-- --- LÍNEA: LÍNEA SALUD OCULAR (3 productos) ---
INSERT INTO productos (catalogo_id, nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo)
SELECT
  (SELECT id FROM catalogos WHERE nombre = 'Línea Salud Ocular' LIMIT 1),
  v.nombre, v.principio_activo, v.presentacion, v.linea, v.precio, v.moneda, v.stock, v.descripcion, v.activo
FROM (VALUES
  ('CLIRMAX', 'NAFAZOLINA 0,12% X10ML SOL OFTAL', 'Gotas 10ml', 'Línea Salud Ocular', 0::numeric, 'USD', 0, 'Indicaciones: Vasoconstrictor ocular para aliviar el enrojecimiento, irritación y congestión ocular menor.', true),
  ('LAGRIMAX FORTE', '0.3%-0.1% X 10 ML OFT LÁGRIMAS ARTIFICIALES', 'Gotas 10ml', 'Línea Salud Ocular', 0::numeric, 'USD', 0, 'Indicaciones: Lubricante ocular para aliviar la resequedad, ardor e irritación por factores ambientales.', true),
  ('OFTABRIM', 'BRIMONIDINA 0.20% X 5ML OFT', 'gotas 5ml', 'Línea Salud Ocular', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento para disminuir la presión intraocular elevada en pacientes con glaucoma.', true)
) AS v(nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo);

-- --- LÍNEA: LÍNEA SALUD RESPIRATORIA (12 productos) ---
INSERT INTO productos (catalogo_id, nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo)
SELECT
  (SELECT id FROM catalogos WHERE nombre = 'Línea Salud Respiratoria' LIMIT 1),
  v.nombre, v.principio_activo, v.presentacion, v.linea, v.precio, v.moneda, v.stock, v.descripcion, v.activo
FROM (VALUES
  ('BUDEQUIT', 'BUDESONIDA SUSP INH 1MG/1ML X 10ML', 'Gotas 10ml', 'Línea Salud Respiratoria', 0::numeric, 'USD', 0, 'Indicaciones: Corticoide inhalado para el mantenimiento y control de los síntomas del asma crónica.', true),
  ('DEXTUSIN', 'BROMHIDRATO DEXTROMETORFANO 15MG/5ML X 120ML', 'Jarabe 120ml', 'Línea Salud Respiratoria', 0::numeric, 'USD', 0, 'Indicaciones: Antitusígeno indicado para el alivio de la tos seca, irritativa o sin expectoración.', true),
  ('FLEMOTOX', 'S-CARBOXIMETILCISTEINA 100MG/5M X120ML', 'Jarabe 120ml', 'Línea Salud Respiratoria', 0::numeric, 'USD', 0, 'Indicaciones: Mucolítico pediátrico para fluidificar secreciones mucosas en gripes o bronquitis.', true),
  ('FLEMOTOX', 'S-CARBOXIMETILCISTEINA 250MG/5M X 120ML', 'Jarabe 120ml', 'Línea Salud Respiratoria', 0::numeric, 'USD', 0, 'Indicaciones: Mucolítico para adultos; reduce la viscosidad del moco facilitando la expectoración.', true),
  ('FLEMUXOL', 'AMBROXOL CLORHID 15MG/5ML X 120ML', 'Jarabe 120ml', 'Línea Salud Respiratoria', 0::numeric, 'USD', 0, 'Indicaciones: Expectorante pediátrico que facilita la expulsión de flemas en procesos respiratorios agudos.', true),
  ('FLEMUXOL', 'AMBROXOL CLORHID 30MG/5ML X 120ML', 'Jarabe 120ml', 'Línea Salud Respiratoria', 0::numeric, 'USD', 0, 'Indicaciones: Expectorante y mucolítico para adultos; disuelve las secreciones bronquiales.', true),
  ('RINAGRIP', 'ACETAMINOFEN 125+ CLORFERINAMINA 0.5MG/15M X 120ML', 'Jarabe 120ml', 'Línea Salud Respiratoria', 0::numeric, 'USD', 0, 'Indicaciones: Alivio de malestares generales de la gripe: congestión, estornudos, fiebre y dolor.', true),
  ('RINAGRIP', 'DIA ACETAMINOFEN 650 MG + CLORFENIRAMINA 2MG X 10 TAB', '10 Tabletas', 'Línea Salud Respiratoria', 0::numeric, 'USD', 0, 'Indicaciones: Fórmula para el día; alivia síntomas antigripales con menor carga sedante.', true),
  ('RINAGRIP', 'NOCHE ACETAMINOFEN 650 MG + CLORFENIRAMINA 4 MG X 10 TAB', '10 Tabletas', 'Línea Salud Respiratoria', 0::numeric, 'USD', 0, 'Indicaciones: Fórmula reforzada nocturna que alivia los síntomas y favorece el descanso del paciente.', true),
  ('RINAX', 'NAFAZOLINA 0.1% X 10 ML', 'Gotas 10ml', 'Línea Salud Respiratoria', 0::numeric, 'USD', 0, 'Indicaciones: Descongestionante nasal para el alivio rápido de la nariz tapada por resfriados o alergias.', true),
  ('SALBUQUIT', 'SALBUTAMOL AER 100MCG X 200 DOSIS', 'Aerosol 200 dosis', 'Línea Salud Respiratoria', 0::numeric, 'USD', 0, 'Indicaciones: Broncodilatador de acción rápida para crisis asmáticas o broncoespasmo (rescate).', true),
  ('SALBUQUIT', 'SALBUTAMOL SUSP PARA INH 5MG/1ML X 15ML', 'gotas 15ml', 'Línea Salud Respiratoria', 0::numeric, 'USD', 0, 'Indicaciones: Solución para nebulización en crisis asmáticas severas o bronquitis obstructiva.', true)
) AS v(nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo);

-- --- LÍNEA: LÍNEA SALUD SEXUAL (3 productos) ---
INSERT INTO productos (catalogo_id, nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo)
SELECT
  (SELECT id FROM catalogos WHERE nombre = 'Línea Salud Sexual' LIMIT 1),
  v.nombre, v.principio_activo, v.presentacion, v.linea, v.precio, v.moneda, v.stock, v.descripcion, v.activo
FROM (VALUES
  ('VIGOFIL', 'TADALAFIL 20MG X 4 TAB', '4 Tabletas', 'Línea Salud Sexual', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de la disfunción eréctil y síntomas de la hiperplasia prostática benigna.', true),
  ('VIGOSIL', 'SILDENAFIL 100MG X 4 TAB', '4 Tabletas', 'Línea Salud Sexual', 0::numeric, 'USD', 0, 'Indicaciones: Inhibidor de la PDE5 para el tratamiento de la disfunción eréctil masculina (dosis máxima).', true),
  ('VIGOSIL', 'SILDENAFIL 50MG X 4 TAB', '4 Tabletas', 'Línea Salud Sexual', 0::numeric, 'USD', 0, 'Indicaciones: Dosis estándar recomendada para la disfunción eréctil.', true)
) AS v(nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo);

-- --- LÍNEA: LÍNEA SISTEMA NERVIOSO (11 productos) ---
INSERT INTO productos (catalogo_id, nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo)
SELECT
  (SELECT id FROM catalogos WHERE nombre = 'Línea Sistema Nervioso' LIMIT 1),
  v.nombre, v.principio_activo, v.presentacion, v.linea, v.precio, v.moneda, v.stock, v.descripcion, v.activo
FROM (VALUES
  ('CARZIP', 'CARBAMAZEPINA 200 MG X 30 TAB', '30 Tabletas', 'Línea Sistema Nervioso', 0::numeric, 'USD', 0, 'Indicaciones: Anticonvulsivante para crisis epilépticas, neuralgia del trigémino y trastorno bipolar.', true),
  ('DOSQUET', 'QUETIAPINA 100MG X10TAB', '10 Tabletas', 'Línea Sistema Nervioso', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de la esquizofrenia, trastorno bipolar (episodios maníacos o depresivos).', true),
  ('DOSQUET', 'QUETIAPINA 25MG X10 TAB', '10 Tabletas', 'Línea Sistema Nervioso', 0::numeric, 'USD', 0, 'Indicaciones: Dosis de inicio para trastornos de ansiedad, insomnio asociado o ajuste de esquizofrenia.', true),
  ('NERGAB', 'PREGABALINA 75MG X 10 TAB', '10 Tabletas', 'Línea Sistema Nervioso', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento del dolor neuropático periférico (diabético), fibromialgia y trastorno de ansiedad generalizada.', true),
  ('PARKIDOP', 'CARBIDOPA +LEVODOPA 25MG/250MG X 10 TAB', '10 Tabletas', 'Línea Sistema Nervioso', 0::numeric, 'USD', 0, 'Indicaciones: Fármaco antiparkinsoniano para controlar el temblor y la rigidez de la enfermedad de Parkinson.', true),
  ('RIDOX', 'RISPERIDONA 1MG X10 TAB', '10 Tabletas', 'Línea Sistema Nervioso', 0::numeric, 'USD', 0, 'Indicaciones: Antipsicótico para la esquizofrenia, episodios maníacos o agresividad en autismo.', true),
  ('RIDOX', 'RISPERIDONA 2MG X10 TAB', '10 Tabletas', 'Línea Sistema Nervioso', 0::numeric, 'USD', 0, 'Indicaciones: Dosis de mantenimiento para trastornos psicóticos o de conducta severos.', true),
  ('TIRACETAX', 'LEVETIRACITAM 1000MG X10 TAB', '10 Tabletas', 'Línea Sistema Nervioso', 0::numeric, 'USD', 0, 'Indicaciones: Antiepiléptico indicado para crisis convulsivas mioclónicas, parciales o tónico-clónicas.', true),
  ('TIRACETAX', 'LEVETIRACITAM 500MG X 10 TAB', '10 Tabletas', 'Línea Sistema Nervioso', 0::numeric, 'USD', 0, 'Indicaciones: Dosis de inicio o mantenimiento intermedio para el control de la epilepsia.', true),
  ('VAPROX', 'VALPROATO DE SODIO ORAL X 120ML', 'Jarabe 120ml', 'Línea Sistema Nervioso', 0::numeric, 'USD', 0, 'Indicaciones: Anticonvulsivante líquido para el control de crisis epilépticas y episodios maníacos.', true),
  ('VEHISTIN', 'BETAHISTINA 16MG X 10 TAB', '10 Tabletas', 'Línea Sistema Nervioso', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento del vértigo, mareos y tinnitus asociados al Síndrome de Menière.', true)
) AS v(nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo);

-- --- LÍNEA: LÍNEA VITAMINAS Y MINERALES (22 productos) ---
INSERT INTO productos (catalogo_id, nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo)
SELECT
  (SELECT id FROM catalogos WHERE nombre = 'Línea Vitaminas y Minerales' LIMIT 1),
  v.nombre, v.principio_activo, v.presentacion, v.linea, v.precio, v.moneda, v.stock, v.descripcion, v.activo
FROM (VALUES
  ('ADC-VITAMINAS', 'A,D,C X 30ML', 'Gotas 30ml', 'Línea Vitaminas y Minerales', 0::numeric, 'USD', 0, 'Indicaciones: Prevención y tratamiento de deficiencias vitamínicas, desarrollo óseo y refuerzo inmune.
Posología: Dosis pediátrica general: 0.5 ml a 1 ml al día (según indicación del pediatra).', true),
  ('CALCI-D', 'CALCIO + V D3 X 30 TAB', '30 Tabletas', 'Línea Vitaminas y Minerales', 0::numeric, 'USD', 0, 'Indicaciones: Prevención y tratamiento de la osteoporosis, deficiencia de calcio y mantenimiento óseo.
Posología: 1 a 2 tabletas al día, preferiblemente con las comidas.', true),
  ('CELUFOL', 'ACIDO FOLICO 10MG X 30 TAB', '30 Tabletas', 'Línea Vitaminas y Minerales', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de la anemia por deficiencia de folato y dosis altas de soporte.
Posología: 1 tableta (10 mg) al día o según criterio del especialista.', true),
  ('CELUFOL', 'ACIDO FOLICO 10MG X 30ML', 'Gotas 30ml', 'Línea Vitaminas y Minerales', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento de la anemia por deficiencia de folato y dosis altas de soporte.
Posología: Dosis pediátrica general: 1ml a 5 ml al día (según indicación del pediatra).', true),
  ('CENTUVEN', 'CARE MULTIVITAMINAS Y MINERALES X 30 CAPS', '30 Cápsulas Blandas', 'Línea Vitaminas y Minerales', 0::numeric, 'USD', 0, 'Indicaciones: De la A a la E. Minerales como Magnesio, Zinc, Yodo y Hierro para mejorar la energía y el enfoque. Mejorar la salud de la piel, el cabello y las uñas.
Fortalecer músculos y huesos.
Posología: 1 cápsula al día con el desayuno.', true),
  ('CENTUVEN', 'SILVER X 30 TAB', '30 Tabletas', 'Línea Vitaminas y Minerales', 0::numeric, 'USD', 0, 'Indicaciones: Suplemento multivitamínico balanceado diseñado para adultos mayores de 50 años. Ofrece vitalidad, inmunidad, mejora en la salud visual y de los huesos.
Posología: 1 tableta al día con alimentos.', true),
  ('CITRAMAGX', 'CITRATO DE MAGNESIO X 622.28MG X 30 CAP', '30 cápsulas', 'Línea Vitaminas y Minerales', 0::numeric, 'USD', 0, 'Indicaciones: Suplemento para la fatiga muscular, calambres, soporte del sistema nervioso y estreñimiento leve.
Posología: 1 cápsula al día', true),
  ('DOSVIT-', 'C VITAMINA C 500MG X 10 CAP BLANDAS', '30 Tabletas', 'Línea Vitaminas y Minerales', 0::numeric, 'USD', 0, 'Indicaciones: Prevención y tratamiento de deficiencias de vitaminas B, neuritis, neuropatías y fatiga.
Posología: 1 tableta al día, de preferencia con la comida de la mañana.', true),
  ('DOSVIT-B', 'COMPLEJO B X 30 TAB', '1 Ampolla', 'Línea Vitaminas y Minerales', 0::numeric, 'USD', 0, 'Indicaciones: Vitaminas B1, B2, B3, B6 y B12 en una sola toma. Mejora el estado de ánimo. Fundamental en la transformación de los alimentos en energía. Clave en la formación de los glóbulos rojos', true),
  ('DOSVIT-C', 'VITAMINA C 500 MG X5ML I.M/I.V X 1 AMP', '10 Cápsulas blandas', 'Línea Vitaminas y Minerales', 0::numeric, 'USD', 0, 'Indicaciones: Antioxidante, fortalece el sistema inmunológico. Mejora la absorción de hierro y la síntesis de colágeno.
Posología: 1 a 2 cápsulas blandas al día.', true),
  ('FLEXAVIT', 'GLUCOSAMINA 200MG +COLAGENO 100MG+ ACIDO HIALURONICO 50MG+ CONDROITINA 100MG+ MAGNESIO 50MG X 30 CAP', '30 cápsulas blandas', 'Línea Vitaminas y Minerales', 0::numeric, 'USD', 0, 'Indicaciones: Coadyuvante en la regeneración de cartílagos, dolor articular y tratamiento de la artrosis. Alivia del dolor articular y muscular y mejora de la movilidad y flexibilidad. Ayuda a la regeneración del cartílago. Previene el desgaste articular
Posología: 1 -2 cápsulas al día con abundante agua durante las comidas.', true),
  ('FORMAGX', '4 MAGNESIO CITRATO 200MG/ BISGLICINATO 100MG/ TREONATO 100 MG/ MALATO 100 MGX 30 CAPS', '30 Cápsulas', 'Línea Vitaminas y Minerales', 0::numeric, 'USD', 0, 'Indicaciones: Fórmula avanzada de magnesio para alta absorción, soporte cognitivo, muscular y relajación.
Posología: 1 cápsula por la noche.', true),
  ('GLIMAGX', 'GLICINATO DE MAGNESIO 550MG X 30 CAP', '30 cápsulas blandas', 'Línea Vitaminas y Minerales', 0::numeric, 'USD', 0, 'Indicaciones: Suplemento de magnesio quelado de alta disponibilidad para el descanso, sueño y estrés.
Posología: 1 cápsula al día por la noche.', true),
  ('IRFER', 'FUMARAT FERROSO 300MG+ HIERRO 99MG X 30 TAB', '30 Tabletas', 'Línea Vitaminas y Minerales', 0::numeric, 'USD', 0, 'Indicaciones: Prevención y tratamiento de la anemia ferropénica (por deficiencia de hierro).
Posología: 1 tableta al día en ayuna', true),
  ('IRFOL', 'B12 ACIDO FOLICO + HIERRO + B12 X 10 TAB', '10 Tabletas', 'Línea Vitaminas y Minerales', 0::numeric, 'USD', 0, 'Indicaciones: Tratamiento integral de anemias carenciales nutricionales o durante el embarazo.
Posología: 1 tableta al día por las mañanas.', true),
  ('IRFOL', 'HIERRO 20MG+ ACIDO FOLICO 80 MCG X 30ML GOTAS', 'gotas 30ml', 'Línea Vitaminas y Minerales', 0::numeric, 'USD', 0, 'Indicaciones: Suplemento de hierro y folatos para la prevención de anemia infantil.
Posología: Dosis: Según indicación del pediatra basada en las gotas por kilogramo de peso.', true),
  ('IRFOL', 'HIERRO 360MCG + ACIDO FOLICO 40MCG/15ML X 120ML', 'Jarabe 120ml', 'Línea Vitaminas y Minerales', 0::numeric, 'USD', 0, 'Indicaciones: Suplemento reconstructor para niños mayores o adultos con estados de anemia leve.
Posología: Dosis: Según indicación del pediatra basada en las gotas por kilogramo de peso.', true),
  ('NEUVIT', 'COMPLEJO B X 10 TAB', '10 Tabletas', 'Línea Vitaminas y Minerales', 0::numeric, 'USD', 0, 'Indicaciones: Soporte para el dolor neurítico, deficiencias vitamínicas y suplementación metabólica.
Posología: 1 tableta al día.', true),
  ('OMEGA', '3 ACEITE DE PESCADO 1000MG X 30 CAP', '30 cápsulas blandas', 'Línea Vitaminas y Minerales', 0::numeric, 'USD', 0, 'Indicaciones: Coadyuvante en la reducción de triglicéridos y factor protector cerebral y cardiovascular.
Posología: 1 a 2 cápsulas al día acompañando las comidas.', true),
  ('VITAL-D', 'VITAMINA D3 2000UI X 30 CAP BLANDAS', '30 cápuslas blandas', 'Línea Vitaminas y Minerales', 0::numeric, 'USD', 0, 'Indicaciones: Suplementación para la salud ósea, fijación de calcio y mejora inmunológica.
Posología: 1 cápsula blanda al día.', true),
  ('VITAMINA', 'C 100 MG / 5ML X 120ML', 'Jarabe 120ml', 'Línea Vitaminas y Minerales', 0::numeric, 'USD', 0, 'Indicaciones: Prevención de estados carenciales de vitamina C y refuerzo del sistema inmune infantil.
Posología: Dosis pediátrica general: 1ml a 5 ml al día (según indicación del pediatra).', true),
  ('VITAMINA', 'E 400UI X 10 CAP BLANDAS', '10 Cápsulas blandas', 'Línea Vitaminas y Minerales', 0::numeric, 'USD', 0, 'Indicaciones: Antioxidante celular, favorece la salud de la piel y ayuda al soporte metabólico.
Posología: 1 cápsula blanda al día con alguna comida.', true)
) AS v(nombre, principio_activo, presentacion, linea, precio, moneda, stock, descripcion, activo);

COMMIT;
