
(() => {
  'use strict';

  const $ = id => document.getElementById(id);

  const panel = document.querySelector('.panel');
  const oldColors = document.querySelector('.stage[data-stage="1"]');
  const exportStage = document.querySelector('.stage[data-stage="2"]');
  const setup = document.querySelector('.stage[data-stage="0"]');

  if (!panel || !oldColors || !exportStage || !setup) {
    console.error('V15: estrutura HTML necessária não encontrada.');
    return;
  }

  // ========================================
  // 1. BRAND SETUP
  // ========================================

  const colors = document.createElement('section');
  colors.className = 'v15-card';
  colors.innerHTML = `
    <h3>02 / Paleta cromática (motor V14 preservado)</h3>
    <p>
      Na Fase 2 será atualizado para duas cores-base e duas
      derivações Golden Angle. Nesta fase mantém-se o motor
      original para preservar os resultados de exportação.
    </p>
  `;

  for (const node of [...oldColors.children]) {
    if (node.classList?.contains('buttons')) continue;
    colors.appendChild(node);
  }

  setup.appendChild(colors);
  oldColors.remove();

  const setupTitle = setup.querySelector('h2');
  if (setupTitle) setupTitle.textContent = '01 / Brand Setup';

  const setupDescription = setup.querySelector('p');
  if (setupDescription) {
    setupDescription.textContent =
      'Define a identidade base. Os ficheiros e dados serão guardados no projeto.';
  }

  setup.querySelector('.buttons')?.remove();

  const font = $('brandFont');

  if (font) {
    const fontField = font.previousElementSibling;

    if (fontField && fontField.parentNode === setup) {
      setup.insertBefore(fontField, colors);
    }

    if (font.parentNode === setup) {
      setup.insertBefore(font, colors);
    }
  }

  // ========================================
  // 2. VISUAL ASSETS
  // ========================================

  const assets = document.createElement('div');
  assets.className = 'stage hidden';
  assets.dataset.stage = '1';

  assets.innerHTML = `
    <h2>02 / Visual Assets</h2>
    <p>
      Biblioteca do projeto. A biblioteca de Smart Templates
      será integrada na Fase 4.
    </p>

    <div class="v15-card">
      <h3>Recursos atuais</h3>
      <p>
        Os ficheiros carregados no Brand Setup são reutilizados
        no Brand Board, PDF e ZIP.
      </p>
      <div id="v15-assets-count" class="v15-help">
        Nenhum ficheiro carregado.
      </div>
    </div>

    <div class="v15-card">
      <h3>Elementos gráficos</h3>
      <p>
        Carrega até quatro grafismos. O gerador automático
        de padrões será acrescentado na Fase 2.
      </p>
      <div id="v15-graphics-slot"></div>
    </div>

    <div class="v15-card">
      <h3>Biblioteca híbrida — preparação</h3>
      <span class="v15-pill">Stationery</span>
      <span class="v15-pill">Packaging</span>
      <span class="v15-pill">Digital</span>
      <span class="v15-pill">Social</span>
      <span class="v15-pill">Merchandise</span>
      <span class="v15-pill">Signage</span>
      <span class="v15-pill">Photography</span>
      <span class="v15-pill">Patterns</span>
      <p>
        Catálogo local/online e Smart Templates ainda não
        disponíveis nesta fase.
      </p>
    </div>
  `;

  const gfx = $('graphics');

  if (gfx) {
    const gfxLabel = gfx.previousElementSibling;
    const gfxSlot = assets.querySelector('#v15-graphics-slot');

    if (gfxLabel) gfxSlot.appendChild(gfxLabel);
    gfxSlot.appendChild(gfx);
  }

  // ========================================
  // 3. BRAND GUIDELINES
  // ========================================

  const guide = document.createElement('div');
  guide.className = 'stage hidden';
  guide.dataset.stage = '2';

  guide.innerHTML = `
    <h2>03 / Brand Guidelines</h2>
    <p>
      20 páginas A4 com ordem fixa. Navega pelas páginas
      e consulta a pré-visualização do motor PDF existente.
    </p>

    <label class="field">Página</label>
    <div id="v15-pages" class="v15-page-list"></div>

    <div class="v15-page-preview">
      <canvas id="v15-page-canvas" width="450" height="637"></canvas>
    </div>

    <p id="v15-page-name" class="v15-help"></p>

    <div class="v15-controls">
      <button class="secondary" id="v15-prev" type="button">
        ← Anterior
      </button>
      <button class="secondary" id="v15-next" type="button">
        Seguinte →
      </button>
      <button class="secondary" id="v15-refresh" type="button">
        Atualizar página
      </button>
    </div>

    <div class="v15-card">
      <h3>Editar conteúdos disponíveis</h3>
      <p>
        Os campos gerais são editados em Brand Setup.
        Os campos próprios de cada página serão adicionados
        na Fase 3.
      </p>

      <label class="check">
        <input type="checkbox" id="v15-advanced-toggle">
        Mostrar opções avançadas
      </label>

      <div id="v15-advanced" class="v15-advanced hidden">
        <p>
          Estrutura FIXED · Editorial Premium · Smart Hybrid.
          A ordem e o número de páginas estão bloqueados.
          Ajustes finos por página ficam para a Fase 3.
        </p>
      </div>
    </div>
  `;

  // ========================================
  // 4. EXPORT STUDIO
  // ========================================

  exportStage.dataset.stage = '3';

  const exportTitle = exportStage.querySelector('h2');
  if (exportTitle) exportTitle.textContent = '04 / Export Studio';

  for (const id of ['back2']) {
    $(id)?.parentElement?.remove();
  }

  for (const id of ['next0', 'next1', 'back1']) {
    $(id)?.remove();
  }

  panel.insertBefore(assets, exportStage);
  panel.insertBefore(guide, exportStage);

  // ========================================
  // 5. NAVEGAÇÃO
  // ========================================

  const nav = document.querySelector('.steps');

  nav.classList.add('v15-tabs');
  nav.innerHTML = '';

  const stageNames = [
    '01 · Brand Setup',
    '02 · Visual Assets',
    '03 · Guidelines',
    '04 · Export Studio'
  ];

  stageNames.forEach((name, i) => {
    const button = document.createElement('button');

    button.type = 'button';
    button.className = 'step' + (i === 0 ? ' active' : '');
    button.textContent = name;
    button.onclick = () => show(i);

    nav.appendChild(button);
  });

  function show(n) {
    document.querySelectorAll('.stage').forEach(el => {
      el.classList.toggle(
        'hidden',
        Number(el.dataset.stage) !== n
      );
    });

    [...nav.children].forEach((el, i) => {
      el.classList.toggle('active', i === n);
    });

    if (n === 1) updateAssets();
    if (n === 2) drawPage();

    if (n === 3) {
      try {
        previewGuide();
      } catch (error) {
        console.warn('Erro na pré-visualização:', error);
      }
    }
  }

  // ========================================
  // 6. PROJECT MANAGER
  // ========================================

  const toolbar = document.createElement('div');
  toolbar.className = 'project-toolbar';

  toolbar.innerHTML = `
    <strong>
      ◩ V15 · Phase 1
      <small> / Project Manager</small>
    </strong>

    <button id="v15-new" type="button">
      Novo projeto
    </button>

    <button id="v15-save" type="button" class="primary">
      Guardar agora
    </button>

    <button id="v15-download" type="button">
      ↓ Exportar projeto
    </button>

    <button id="v15-open" type="button">
      ↑ Abrir projeto
    </button>

    <input
      id="v15-import"
      type="file"
      accept=".json,application/json"
      hidden
    >

    <small id="v15-save-state">
      A iniciar armazenamento…
    </small>
  `;

  document.querySelector('main').before(toolbar);

  // ========================================
  // 7. CAMPOS DO PROJETO
  // ========================================

  const fields = [
    'brand',
    'tagline',
    'accent',
    'extra',
    'extraLogo',
    'extraBg',
    'headline',
    'description',
    'project',
    'resolution'
  ];

  const uploadIds = [
    'logo',
    'symbol',
    'photos',
    'brandFont',
    'graphics'
  ];

  let busy = false;
  let timer = null;
  let currentPage = 0;
  let db = null;
  let saving = false;

  // ========================================
  // 8. INDEXEDDB
  // ========================================

  const dbPromise = new Promise(resolve => {
    if (!window.indexedDB) {
      resolve(null);
      return;
    }

    try {
      const request = indexedDB.open(
        'logo-pack-studio-v15',
        1
      );

      request.onupgradeneeded = () => {
        const database = request.result;

        if (!database.objectStoreNames.contains('projects')) {
          database.createObjectStore('projects');
        }
      };

      request.onsuccess = () => resolve(request.result);

      request.onerror = () => {
        console.error(
          'IndexedDB:',
          request.error
        );
        resolve(null);
      };

      request.onblocked = () => {
        console.warn('IndexedDB bloqueado por outra ligação.');
        resolve(null);
      };

    } catch (error) {
      console.error('Erro ao abrir IndexedDB:', error);
      resolve(null);
    }
  });

  function message(text) {
    const state = $('v15-save-state');
    if (state) state.textContent = text;
  }

  function fieldState() {
    const result = {};

    for (const id of fields) {
      const el = $(id);

      if (!el) continue;

      result[id] =
        el.type === 'checkbox' ? el.checked : el.value;
    }

    return result;
  }

  function getUploads() {
    const result = {};

    for (const id of uploadIds) {
      const el = $(id);
      result[id] = el?.files ? [...el.files] : [];
    }

    return result;
  }

  function snapshot() {
    return {
      schema: 'logo-pack-studio-project',
      version: 15,
      phase: 1,
      updatedAt: new Date().toISOString(),
      fields: fieldState(),
      uploads: getUploads()
    };
  }

  function dbPut(project) {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error('IndexedDB indisponível'));
        return;
      }

      try {
        const transaction = db.transaction(
          'projects',
          'readwrite'
        );

        transaction.objectStore('projects').put(
          project,
          'autosave'
        );

        transaction.oncomplete = () => resolve();

        transaction.onerror = () => reject(
          transaction.error ||
          new Error('Erro na transação de armazenamento.')
        );

        transaction.onabort = () => reject(
          transaction.error ||
          new Error('O armazenamento foi interrompido.')
        );

      } catch (error) {
        reject(error);
      }
    });
  }

  function dbGet() {
    return new Promise((resolve, reject) => {
      if (!db) {
        resolve(null);
        return;
      }

      try {
        const transaction = db.transaction(
          'projects',
          'readonly'
        );

        const request = transaction
          .objectStore('projects')
          .get('autosave');

        request.onsuccess = () => {
          resolve(request.result || null);
        };

        request.onerror = () => reject(request.error);

      } catch (error) {
        reject(error);
      }
    });
  }

  // ========================================
  // 9. GUARDAR PROJETO — CORRIGIDO
  // ========================================

  async function saveNow() {
    const button = $('v15-save');

    if (busy) {
      message('Aguarda: outra operação está em curso.');
      return;
    }

    if (saving) {
      message('O projeto já está a ser guardado…');
      return;
    }

    saving = true;
    clearTimeout(timer);

    if (button) {
      button.disabled = true;
      button.textContent = 'A guardar…';
    }

    message('A guardar projeto…');

    try {
      if (!db) {
        db = await dbPromise;
      }

      if (!db) {
        throw new Error(
          'Armazenamento local indisponível neste navegador.'
        );
      }

      await dbPut(snapshot());

      const time = new Date().toLocaleTimeString(
        'pt-PT',
        {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }
      );

      message('✓ Projeto guardado às ' + time);

      if (button) {
        button.textContent = '✓ Guardado';
      }

      return true;

    } catch (error) {
      console.error(
        'Logo Pack Studio — erro ao guardar:',
        error
      );

      message('Erro ao guardar: ' + error.message);

      if (button) {
        button.textContent = 'Erro ao guardar';
      }

      return false;

    } finally {
      saving = false;

      if (button) {
        button.disabled = false;
      }
    }
  }

  // ========================================
  // 10. AUTOSAVE
  // ========================================

  function queueSave() {
    if (busy) return;

    message('Alterações por guardar…');

    clearTimeout(timer);

    timer = setTimeout(() => {
      saveNow();
    }, 1100);
  }

  // ========================================
  // 11. RECURSOS
  // ========================================

  function updateAssets() {
    const uploads = getUploads();

    const count = Object.values(uploads).reduce(
      (total, files) => total + files.length,
      0
    );

    const details = Object.entries(uploads)
      .map(([key, files]) => key + ': ' + files.length)
      .join(' · ');

    const counter = $('v15-assets-count');

    if (counter) {
      counter.textContent =
        count + ' ficheiro(s) no projeto · ' + details;
    }
  }

  // ========================================
  // 12. BRAND GUIDELINES
  // ========================================

  function drawPage() {
    const canvas = $('v15-page-canvas');
    if (!canvas) return;

    try {
      const source = paintPage(currentPage, 0.5);
      const context = canvas.getContext('2d');

      canvas.width = source.width;
      canvas.height = source.height;

      context.drawImage(source, 0, 0);

      $('v15-page-name').textContent =
        String(currentPage + 1).padStart(2, '0') +
        ' / 20 — ' +
        pageTitles[currentPage];

      document.querySelectorAll(
        '#v15-pages button'
      ).forEach((button, i) => {
        button.classList.toggle(
          'chosen',
          i === currentPage
        );
      });

      $('v15-prev').disabled = currentPage === 0;
      $('v15-next').disabled = currentPage === 19;

    } catch (error) {
      $('v15-page-name').textContent =
        'Não foi possível gerar a pré-visualização: ' +
        error.message;
    }
  }

  for (let i = 0; i < 20; i++) {
    const button = document.createElement('button');

    button.type = 'button';
    button.textContent = String(i + 1).padStart(2, '0');
    button.title = pageTitles[i];

    button.onclick = () => {
      currentPage = i;
      drawPage();
    };

    $('v15-pages').appendChild(button);
  }

  $('v15-prev').onclick = () => {
    currentPage = Math.max(0, currentPage - 1);
    drawPage();
  };

  $('v15-next').onclick = () => {
    currentPage = Math.min(19, currentPage + 1);
    drawPage();
  };

  $('v15-refresh').onclick = drawPage;

  $('v15-advanced-toggle').onchange = event => {
    $('v15-advanced').classList.toggle(
      'hidden',
      !event.target.checked
    );
  };

  // ========================================
  // 13. RESTAURAR PROJETO
  // ========================================

  async function restore(data) {
    if (
      !data ||
      data.schema !== 'logo-pack-studio-project' ||
      !data.fields ||
      !data.uploads
    ) {
      throw new Error('Ficheiro de projeto inválido');
    }

    busy = true;
    clearTimeout(timer);

    try {
      for (const [id, value] of Object.entries(data.fields)) {
        const el = $(id);
        if (!el) continue;

        if (el.type === 'checkbox') {
          el.checked = !!value;

          el.dispatchEvent(
            new Event('change', { bubbles: true })
          );

        } else {
          el.value = value;

          el.dispatchEvent(
            new Event('input', { bubbles: true })
          );
        }
      }

      for (const id of uploadIds) {
        const el = $(id);
        if (!el) continue;

        const files = data.uploads[id] || [];
        const transfer = new DataTransfer();

        for (const file of files) {
          if (!(file instanceof Blob)) continue;

          transfer.items.add(
            file instanceof File
              ? file
              : new File(
                  [file],
                  file.name || id + '.bin',
                  { type: file.type }
                )
          );
        }

        el.files = transfer.files;

        el.dispatchEvent(
          new Event('change', { bubbles: true })
        );
      }

      await new Promise(resolve => setTimeout(resolve, 400));

      updatePalette();
      render();
      await previewGuide();
      updateAssets();

      message('✓ Projeto aberto com sucesso');

    } finally {
      busy = false;
      queueSave();
    }
  }

  // ========================================
  // 14. EXPORTAR PROJETO JSON
  // ========================================

  function toDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);

      reader.readAsDataURL(file);
    });
  }

  async function downloadProject() {
    const project = snapshot();

    message('A preparar ficheiro portátil…');

    const assets = {};

    for (const [id, files] of Object.entries(project.uploads)) {
      assets[id] = [];

      for (const file of files) {
        assets[id].push({
          name: file.name,
          type: file.type,
          lastModified: file.lastModified,
          data: await toDataURL(file)
        });
      }
    }

    const portable = {
      ...project,
      uploads: assets
    };

    const blob = new Blob(
      [JSON.stringify(portable)],
      { type: 'application/json' }
    );

    const filename =
      (
        (project.fields.brand || 'brand')
          .replace(/[^a-z0-9-]+/gi, '-') || 'brand'
      ) + '-project-v15.json';

    save(blob, filename);

    message('✓ Projeto exportado · inclui imagens e fontes');
  }

  // ========================================
  // 15. IMPORTAR PROJETO JSON
  // ========================================

  async function openPortable(file) {
    const object = JSON.parse(await file.text());

    if (
      object.schema !== 'logo-pack-studio-project' ||
      !object.uploads
    ) {
      throw new Error(
        'Este não é um projeto do Logo Pack Studio'
      );
    }

    const uploads = {};

    for (const [id, items] of Object.entries(object.uploads)) {
      uploads[id] = [];

      for (const item of items) {
        if (
          typeof item.data !== 'string' ||
          !item.data.startsWith('data:')
        ) {
          continue;
        }

        const response = await fetch(item.data);
        const blob = await response.blob();

        uploads[id].push(
          new File(
            [blob],
            item.name || 'asset',
            {
              type: item.type || blob.type,
              lastModified: item.lastModified || Date.now()
            }
          )
        );
      }
    }

    await restore({
      ...object,
      uploads
    });
  }

  // ========================================
  // 16. NOVO PROJETO
  // ========================================

  $('v15-new').onclick = async () => {
    const confirmed = confirm(
      'Criar um novo projeto? O projeto atual será substituído ' +
      'no autosave. Exporta-o primeiro se quiseres guardar uma cópia.'
    );

    if (!confirmed) return;

    busy = true;
    clearTimeout(timer);

    try {
      for (const id of uploadIds) {
        const el = $(id);
        if (!el) continue;

        el.value = '';

        el.dispatchEvent(
          new Event('change', { bubbles: true })
        );
      }

      for (const id of fields) {
        const el = $(id);
        if (!el) continue;

        if (el.type === 'checkbox') {
          el.checked = false;
        } else if (id === 'brand') {
          el.value = 'Nova Marca';
        } else if (id === 'accent') {
          el.value = '#8c263d';
        } else if (id === 'resolution') {
          el.value = '3600';
        } else if (el.type === 'color') {
          el.value = el.defaultValue;
        } else {
          el.value = '';
        }

        el.dispatchEvent(
          new Event('input', { bubbles: true })
        );
      }

      updatePalette();
      render();
      show(0);

    } finally {
      busy = false;
    }

    const saved = await saveNow();

    if (saved) {
      message('✓ Novo projeto criado e guardado');
    }
  };

  // ========================================
  // 17. EVENTOS DO PROJECT MANAGER
  // ========================================

  $('v15-save').onclick = () => {
    saveNow();
  };

  $('v15-download').onclick = () => {
    downloadProject().catch(error => {
      console.error('Erro ao exportar projeto:', error);
      message('Erro: ' + error.message);
    });
  };

  $('v15-open').onclick = () => {
    $('v15-import').click();
  };

  $('v15-import').onchange = async event => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      await openPortable(file);
    } catch (error) {
      console.error('Erro ao abrir projeto:', error);
      message('Erro ao abrir: ' + error.message);
    }

    event.target.value = '';
  };

  // ========================================
  // 18. AUTOSAVE DOS CAMPOS
  // ========================================

  for (const id of [...fields, ...uploadIds]) {
    const el = $(id);
    if (!el) continue;

    el.addEventListener('input', queueSave);

    el.addEventListener('change', () => {
      queueSave();
      updateAssets();

      if (
        document.querySelector(
          '.stage[data-stage="2"]:not(.hidden)'
        )
      ) {
        setTimeout(drawPage, 250);
      }
    });
  }

  // ========================================
  // 19. INICIALIZAÇÃO
  // ========================================

  (async () => {
    db = await dbPromise;

    if (!db) {
      message(
        'Armazenamento indisponível · usa Exportar projeto'
      );
      return;
    }

    try {
      const previous = await dbGet();

      if (previous) {
        await restore(previous);

        message('✓ Projeto recuperado automaticamente');

      } else {
        await saveNow();

        message('Autosave local ativo');
      }

    } catch (error) {
      console.error(
        'Erro ao recuperar projeto:',
        error
      );

      message(
        'Erro ao recuperar projeto: ' + error.message
      );
    }
  })();

  show(0);

})();
