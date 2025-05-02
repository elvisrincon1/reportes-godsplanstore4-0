// main.js - Actualizado para integración con backend API REST

document.addEventListener('DOMContentLoaded', () => {
  const API_BASE = '/.netlify/functions';

  // Navegación entre secciones
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.section');

  function showSection(sectionId) {
    sections.forEach((section) => {
      section.classList.toggle('hidden', section.id !== sectionId);
    });
    navButtons.forEach((btn) => {
      btn.classList.toggle('bg-blue-200', btn.dataset.section === sectionId);
    });
  }

  showSection('reportar-venta');

  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      showSection(btn.dataset.section);
    });
  });

  // Variables globales para datos
  let proveedores = [];
  let afiliados = [];
  let inventario = [];
  let ventas = [];

  // --- FUNCIONES PARA PROVEEDORES ---
  const formProveedor = document.getElementById('form-proveedor');
  const inputNombreProveedor = document.getElementById('input-nombre-proveedor');
  const listaProveedores = document.getElementById('lista-proveedores');
  const buscarProveedor = document.getElementById('buscar-proveedor');

  async function cargarProveedores() {
    try {
      const res = await fetch(\`\${API_BASE}/proveedores\`);
      proveedores = await res.json();
      renderizarProveedores();
    } catch (error) {
      alert('Error al cargar proveedores: ' + error.message);
    }
  }

  function renderizarProveedores(filtrados = null) {
    const lista = filtrados || proveedores;
    listaProveedores.innerHTML = '';
    if (lista.length === 0) {
      listaProveedores.innerHTML = '<li class="text-gray-500">No hay proveedores registrados.</li>';
      return;
    }
    lista.forEach((proveedor) => {
      const li = document.createElement('li');
      li.className = 'flex justify-between items-center bg-white p-2 rounded shadow-sm';
      li.innerHTML = \`
        <span>\${proveedor.nombre}</span>
        <div class="space-x-2">
          <button class="editar text-blue-600 hover:text-blue-800" data-id="\${proveedor.id}" title="Editar">
            <i class="fas fa-edit"></i>
          </button>
          <button class="eliminar text-red-600 hover:text-red-800" data-id="\${proveedor.id}" title="Eliminar">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      \`;
      listaProveedores.appendChild(li);
    });
  }

  async function agregarProveedor(nombre) {
    try {
      const res = await fetch(\`\${API_BASE}/proveedores\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre }),
      });
      if (!res.ok) throw new Error('Error al agregar proveedor');
      await cargarProveedores();
    } catch (error) {
      alert(error.message);
    }
  }

  async function editarProveedor(id, nombre) {
    try {
      const res = await fetch(\`\${API_BASE}/proveedores/\${id}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre }),
      });
      if (!res.ok) throw new Error('Error al editar proveedor');
      await cargarProveedores();
    } catch (error) {
      alert(error.message);
    }
  }

  async function eliminarProveedor(id) {
    try {
      const res = await fetch(\`\${API_BASE}/proveedores/\${id}\`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error al eliminar proveedor');
      await cargarProveedores();
    } catch (error) {
      alert(error.message);
    }
  }

  formProveedor.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = inputNombreProveedor.value.trim();
    if (nombre) {
      agregarProveedor(nombre);
      inputNombreProveedor.value = '';
    }
  });

  listaProveedores.addEventListener('click', (e) => {
    if (e.target.closest('button.editar')) {
      const id = e.target.closest('button.editar').dataset.id;
      const proveedor = proveedores.find(p => p.id == id);
      const nuevoNombre = prompt('Editar nombre del proveedor:', proveedor.nombre);
      if (nuevoNombre !== null && nuevoNombre.trim() !== '') {
        editarProveedor(id, nuevoNombre.trim());
      }
    } else if (e.target.closest('button.eliminar')) {
      const id = e.target.closest('button.eliminar').dataset.id;
      if (confirm('¿Está seguro de eliminar este proveedor?')) {
        eliminarProveedor(id);
      }
    }
  });

  buscarProveedor.addEventListener('input', () => {
    const filtro = buscarProveedor.value.toLowerCase();
    const filtrados = proveedores.filter((p) => p.nombre.toLowerCase().includes(filtro));
    renderizarProveedores(filtrados);
  });

  // --- FUNCIONES PARA AFILIADOS ---
  const formAfiliado = document.getElementById('form-afiliado');
  const inputNombreAfiliado = document.getElementById('input-nombre-afiliado');
  const listaAfiliados = document.getElementById('lista-afiliados');
  const buscarAfiliado = document.getElementById('buscar-afiliado');

  async function cargarAfiliados() {
    try {
      const res = await fetch(\`\${API_BASE}/afiliados\`);
      afiliados = await res.json();
      renderizarAfiliados();
    } catch (error) {
      alert('Error al cargar afiliados: ' + error.message);
    }
  }

  function renderizarAfiliados(filtrados = null) {
    const lista = filtrados || afiliados;
    listaAfiliados.innerHTML = '';
    if (lista.length === 0) {
      listaAfiliados.innerHTML = '<li class="text-gray-500">No hay afiliados registrados.</li>';
      return;
    }
    lista.forEach((afiliado) => {
      const li = document.createElement('li');
      li.className = 'flex justify-between items-center bg-white p-2 rounded shadow-sm';
      li.innerHTML = \`
        <span>\${afiliado.nombre}</span>
        <div class="space-x-2">
          <button class="editar text-green-600 hover:text-green-800" data-id="\${afiliado.id}" title="Editar">
            <i class="fas fa-edit"></i>
          </button>
          <button class="eliminar text-red-600 hover:text-red-800" data-id="\${afiliado.id}" title="Eliminar">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      \`;
      listaAfiliados.appendChild(li);
    });
  }

  async function agregarAfiliado(nombre) {
    try {
      const res = await fetch(\`\${API_BASE}/afiliados\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre }),
      });
      if (!res.ok) throw new Error('Error al agregar afiliado');
      await cargarAfiliados();
    } catch (error) {
      alert(error.message);
    }
  }

  async function editarAfiliado(id, nombre) {
    try {
      const res = await fetch(\`\${API_BASE}/afiliados/\${id}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre }),
      });
      if (!res.ok) throw new Error('Error al editar afiliado');
      await cargarAfiliados();
    } catch (error) {
      alert(error.message);
    }
  }

  async function eliminarAfiliado(id) {
    try {
      const res = await fetch(\`\${API_BASE}/afiliados/\${id}\`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error al eliminar afiliado');
      await cargarAfiliados();
    } catch (error) {
      alert(error.message);
    }
  }

  formAfiliado.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = inputNombreAfiliado.value.trim();
    if (nombre) {
      agregarAfiliado(nombre);
      inputNombreAfiliado.value = '';
    }
  });

  listaAfiliados.addEventListener('click', (e) => {
    if (e.target.closest('button.editar')) {
      const id = e.target.closest('button.editar').dataset.id;
      const afiliado = afiliados.find(a => a.id == id);
      const nuevoNombre = prompt('Editar nombre del afiliado:', afiliado.nombre);
      if (nuevoNombre !== null && nuevoNombre.trim() !== '') {
        editarAfiliado(id, nuevoNombre.trim());
      }
    } else if (e.target.closest('button.eliminar')) {
      const id = e.target.closest('button.eliminar').dataset.id;
      if (confirm('¿Está seguro de eliminar este afiliado?')) {
        eliminarAfiliado(id);
      }
    }
  });

  buscarAfiliado.addEventListener('input', () => {
    const filtro = buscarAfiliado.value.toLowerCase();
    const filtrados = afiliados.filter((a) => a.nombre.toLowerCase().includes(filtro));
    renderizarAfiliados(filtrados);
  });

  // --- FUNCIONES PARA INVENTARIO ---
  const formInventario = document.getElementById('form-inventario');
  const inputNombreProducto = document.getElementById('input-nombre-producto');
  const inputPrecioCompra = document.getElementById('input-precio-compra');
  const inputPrecioVenta = document.getElementById('input-precio-venta');
  const selectProveedor1 = document.getElementById('select-proveedor-1');
  const selectProveedor2 = document.getElementById('select-proveedor-2');
  const listaProveedor1 = document.getElementById('lista-proveedor-1');
  const listaProveedor2 = document.getElementById('lista-proveedor-2');
  const buscarProducto = document.getElementById('buscar-producto');
  const listaInventario = document.getElementById('lista-inventario');

  async function cargarInventario() {
    try {
      const res = await fetch(\`\${API_BASE}/inventario\`);
      inventario = await res.json();
      renderizarInventario();
    } catch (error) {
      alert('Error al cargar inventario: ' + error.message);
    }
  }

  function renderizarInventario(filtrados = null) {
    const lista = filtrados || inventario;
    listaInventario.innerHTML = '';
    if (lista.length === 0) {
      listaInventario.innerHTML = '<li class="text-gray-500">No hay productos en el inventario.</li>';
      return;
    }
    lista.forEach((producto) => {
      const li = document.createElement('li');
      li.className = 'flex justify-between items-center bg-white p-2 rounded shadow-sm';
      li.innerHTML = \`
        <div>
          <div class="font-semibold">\${producto.nombre}</div>
          <div class="text-sm text-gray-600">Compra: $\${producto.precio_compra.toFixed(2)} | Venta: $\${producto.precio_venta.toFixed(2)}</div>
          <div class="text-sm text-gray-600">Proveedor 1: \${producto.proveedor1} \${producto.proveedor2 ? '| Proveedor 2: ' + producto.proveedor2 : ''}</div>
        </div>
        <div class="space-x-2">
          <button class="editar text-purple-600 hover:text-purple-800" data-id="\${producto.id}" title="Editar">
            <i class="fas fa-edit"></i>
          </button>
          <button class="eliminar text-red-600 hover:text-red-800" data-id="\${producto.id}" title="Eliminar">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      \`;
      listaInventario.appendChild(li);
    });
  }

  async function agregarProducto(producto) {
    try {
      const res = await fetch(\`\${API_BASE}/inventario\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto),
      });
      if (!res.ok) throw new Error('Error al agregar producto');
      await cargarInventario();
    } catch (error) {
      alert(error.message);
    }
  }

  async function editarProducto(id, producto) {
    try {
      const res = await fetch(\`\${API_BASE}/inventario/\${id}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto),
      });
      if (!res.ok) throw new Error('Error al editar producto');
      await cargarInventario();
    } catch (error) {
      alert(error.message);
    }
  }

  async function eliminarProducto(id) {
    try {
      const res = await fetch(\`\${API_BASE}/inventario/\${id}\`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error al eliminar producto');
      await cargarInventario();
    } catch (error) {
      alert(error.message);
    }
  }

  formInventario.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = inputNombreProducto.value.trim();
    const precio_compra = parseFloat(inputPrecioCompra.value);
    const precio_venta = parseFloat(inputPrecioVenta.value);
    const proveedor1 = selectProveedor1.value.trim();
    const proveedor2 = selectProveedor2.value.trim();

    if (!nombre || isNaN(precio_compra) || isNaN(precio_venta) || !proveedor1) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }
    if (precio_venta < precio_compra) {
      alert('El precio de venta no puede ser menor que el precio de compra.');
      return;
    }
    if (!proveedores.some(p => p.nombre === proveedor1)) {
      alert('Proveedor 1 no válido.');
      return;
    }
    if (proveedor2 && !proveedores.some(p => p.nombre === proveedor2)) {
      alert('Proveedor 2 no válido.');
      return;
    }

    const nuevoProducto = {
      nombre,
      precio_compra,
      precio_venta,
      proveedor1,
      proveedor2: proveedor2 || null,
    };

    agregarProducto(nuevoProducto);

    formInventario.reset();
    listaProveedor1.classList.add('hidden');
    listaProveedor2.classList.add('hidden');
  });

  listaInventario.addEventListener('click', (e) => {
    if (e.target.closest('button.editar')) {
      const id = e.target.closest('button.editar').dataset.id;
      const producto = inventario.find(p => p.id == id);
      if (!producto) return;
      const nuevoNombre = prompt('Editar nombre del producto:', producto.nombre);
      if (nuevoNombre === null) return;
      const nuevoPrecioCompra = parseFloat(prompt('Editar precio de compra:', producto.precio_compra));
      if (isNaN(nuevoPrecioCompra)) return alert('Precio de compra inválido.');
      const nuevoPrecioVenta = parseFloat(prompt('Editar precio de venta:', producto.precio_venta));
      if (isNaN(nuevoPrecioVenta)) return alert('Precio de venta inválido.');
      if (nuevoPrecioVenta < nuevoPrecioCompra) return alert('El precio de venta no puede ser menor que el precio de compra.');
      const nuevoProveedor1 = prompt('Editar proveedor 1:', producto.proveedor1);
      if (!nuevoProveedor1 || !proveedores.some(p => p.nombre === nuevoProveedor1)) return alert('Proveedor 1 inválido.');
      const nuevoProveedor2 = prompt('Editar proveedor 2 (opcional):', producto.proveedor2 || '');
      if (nuevoProveedor2 && !proveedores.some(p => p.nombre === nuevoProveedor2)) return alert('Proveedor 2 inválido.');

      const productoEditado = {
        nombre: nuevoNombre.trim(),
        precio_compra: nuevoPrecioCompra,
        precio_venta: nuevoPrecioVenta,
        proveedor1: nuevoProveedor1.trim(),
        proveedor2: nuevoProveedor2.trim() || null,
      };
      editarProducto(id, productoEditado);
    } else if (e.target.closest('button.eliminar')) {
      const id = e.target.closest('button.eliminar').dataset.id;
      if (confirm('¿Está seguro de eliminar este producto?')) {
        eliminarProducto(id);
      }
    }
  });

  selectProveedor1.addEventListener('input', () => {
    mostrarListaProveedores(selectProveedor1, listaProveedor1, proveedores.map(p => p.nombre));
  });

  selectProveedor2.addEventListener('input', () => {
    mostrarListaProveedores(selectProveedor2, listaProveedor2, proveedores.map(p => p.nombre));
  });

  document.addEventListener('click', (e) => {
    if (!selectProveedor1.contains(e.target)) {
      listaProveedor1.classList.add('hidden');
    }
    if (!selectProveedor2.contains(e.target)) {
      listaProveedor2.classList.add('hidden');
    }
  });

  buscarProducto.addEventListener('input', () => {
    const filtro = buscarProducto.value.toLowerCase();
    const filtrados = inventario.filter((p) => p.nombre.toLowerCase().includes(filtro));
    renderizarInventario(filtrados);
  });

  // --- FUNCIONES PARA VENTAS ---
  const formReportarVenta = document.getElementById('form-reportar-venta');
  const inputAfiliado = document.getElementById('input-afiliado');
  const listaAfiliadosSugeridos = document.getElementById('lista-afiliados-sugeridos');
  const selectProducto = document.getElementById('select-producto');
  const inputFechaVenta = document.getElementById('input-fecha-venta');
  const listaVentas = document.getElementById('lista-ventas');

  async function cargarVentas() {
    try {
      const res = await fetch(\`\${API_BASE}/ventas\`);
      ventas = await res.json();
      renderizarVentas();
    } catch (error) {
      alert('Error al cargar ventas: ' + error.message);
    }
  }

  function renderizarVentas() {
    listaVentas.innerHTML = '';
    if (ventas.length === 0) {
      listaVentas.innerHTML = '<li class="text-gray-500">No hay ventas reportadas.</li>';
      return;
    }
    ventas.forEach((venta) => {
      const li = document.createElement('li');
      li.className = 'flex justify-between items-center bg-white p-2 rounded shadow-sm';
      li.innerHTML = \`
        <div>
          <div><span class="font-semibold">Afiliado:</span> \${venta.afiliado}</div>
          <div><span class="font-semibold">Producto:</span> \${venta.nombre}</div>
          <div><span class="font-semibold">Fecha:</span> \${venta.fecha}</div>
        </div>
        <div>
          <button class="eliminar text-red-600 hover:text-red-800" data-id="\${venta.id}" title="Eliminar">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      \`;
      listaVentas.appendChild(li);
    });
  }

  async function agregarVenta(venta) {
    try {
      const res = await fetch(\`\${API_BASE}/ventas\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(venta),
      });
      if (!res.ok) throw new Error('Error al agregar venta');
      await cargarVentas();
    } catch (error) {
      alert(error.message);
    }
  }

  async function eliminarVenta(id) {
    try {
      const res = await fetch(\`\${API_BASE}/ventas/\${id}\`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error al eliminar venta');
      await cargarVentas();
    } catch (error) {
      alert(error.message);
    }
  }

  // Función para actualizar lista de productos según afiliado seleccionado
  function actualizarProductosPorAfiliado(afiliado) {
    selectProducto.innerHTML = '<option value="">Seleccione un producto</option>';
    if (!afiliado) return;

    let productosFiltrados = [];
    if (afiliado.toUpperCase() === 'GODSPLAN') {
      productosFiltrados = inventario.filter(p => !p.nombre.startsWith('AF-'));
    } else {
      productosFiltrados = inventario.filter(p => p.nombre.startsWith('AF-'));
    }

    productosFiltrados.forEach((producto, idx) => {
      const option = document.createElement('option');
      option.value = producto.id;
      option.textContent = producto.nombre;
      selectProducto.appendChild(option);
    });
  }

  // Función para mostrar sugerencias de afiliados mientras se escribe
  function mostrarSugerenciasAfiliados(valor) {
    const filtro = valor.toLowerCase();
    const sugeridos = afiliados
      .filter(a => a.nombre.toLowerCase().includes(filtro))
      .sort((a, b) => {
        if (a.nombre.toUpperCase() === 'GODSPLAN') return -1;
        if (b.nombre.toUpperCase() === 'GODSPLAN') return 1;
        return a.nombre.localeCompare(b.nombre);
      });
    listaAfiliadosSugeridos.innerHTML = '';
    if (sugeridos.length === 0 || valor === '') {
      listaAfiliadosSugeridos.classList.add('hidden');
      return;
    }
    sugeridos.forEach((a) => {
      const li = document.createElement('li');
      li.textContent = a.nombre;
      li.className = 'px-2 py-1 hover:bg-blue-200 cursor-pointer';
      li.addEventListener('click', () => {
        inputAfiliado.value = a.nombre;
        listaAfiliadosSugeridos.classList.add('hidden');
        actualizarProductosPorAfiliado(a.nombre);
      });
      listaAfiliadosSugeridos.appendChild(li);
    });
    listaAfiliadosSugeridos.classList.remove('hidden');
  }

  inputAfiliado.addEventListener('input', () => {
    mostrarSugerenciasAfiliados(inputAfiliado.value);
  });

  inputAfiliado.addEventListener('blur', () => {
    setTimeout(() => {
      listaAfiliadosSugeridos.classList.add('hidden');
    }, 200);
  });

  inputAfiliado.addEventListener('change', () => {
    actualizarProductosPorAfiliado(inputAfiliado.value);
  });

  formReportarVenta.addEventListener('submit', (e) => {
    e.preventDefault();
    const afiliado = inputAfiliado.value.trim();
    const productoId = selectProducto.value;
    const fecha = inputFechaVenta.value;

    if (!afiliado || productoId === '' || !fecha) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    if (!afiliados.some(a => a.nombre === afiliado)) {
      alert('Afiliado no válido.');
      return;
    }
    const producto = inventario.find(p => p.id == productoId);
    if (!producto) {
      alert('Producto no válido.');
      return;
    }

    const nuevaVenta = {
      afiliado,
      producto_id: productoId,
      fecha,
    };

    agregarVenta(nuevaVenta);

    formReportarVenta.reset();
    selectProducto.innerHTML = '<option value="">Seleccione un producto</option>';
  });

  listaVentas.addEventListener('click', (e) => {
    if (e.target.closest('button.eliminar')) {
      const id = e.target.closest('button.eliminar').dataset.id;
      if (confirm('¿Está seguro de eliminar esta venta?')) {
        eliminarVenta(id);
      }
    }
  });

  // Inicializar fecha con hoy
  const hoyVenta = new Date().toISOString().split('T')[0];
  inputFechaVenta.value = hoyVenta;

  // --- FUNCIONES PARA GENERAR INFORME ---
  const formGenerarInforme = document.getElementById('form-generar-informe');
  const fechaInicio = document.getElementById('fecha-inicio');
  const fechaFin = document.getElementById('fecha-fin');
  const informeContainer = document.getElementById('informe-container');
  const btnExportarPDF = document.getElementById('btn-exportar-pdf');
  const btnExportarXLSX = document.getElementById('btn-exportar-xlsx');

  // Inicializar fechas con valores por defecto
  const hoyInforme = new Date().toISOString().split('T')[0];
  fechaInicio.value = hoyInforme;
  fechaFin.value = hoyInforme;

  function filtrarVentasPorFecha(inicio, fin) {
    const inicioDate = new Date(inicio);
    const finDate = new Date(fin);
    return ventas.filter(v => {
      const fechaVenta = new Date(v.fecha);
      return fechaVenta >= inicioDate && fechaVenta <= finDate;
    });
  }

  function agruparVentasPorVendedor(ventasFiltradas) {
    const agrupado = {};
    ventasFiltradas.forEach(v => {
      if (!agrupado[v.afiliado]) {
        agrupado[v.afiliado] = [];
      }
      agrupado[v.afiliado].push(v);
    });
    return agrupado;
  }

  function generarTablaInforme(ventasFiltradas) {
    const agrupado = agruparVentasPorVendedor(ventasFiltradas);
    let totalCompra = 0;
    let totalVenta = 0;
    let totalUtilidad = 0;

    let html = '<table class="min-w-full border border-gray-300 text-sm">';
    html += '<thead class="bg-gray-200">';
    html += '<tr>';
    html += '<th class="border border-gray-300 px-2 py-1">Vendedor</th>';
    html += '<th class="border border-gray-300 px-2 py-1">Producto</th>';
    html += '<th class="border border-gray-300 px-2 py-1">Precio Compra</th>';
    html += '<th class="border border-gray-300 px-2 py-1">Precio Venta</th>';
    html += '<th class="border border-gray-300 px-2 py-1">Utilidad</th>';
    html += '<th class="border border-gray-300 px-2 py-1">Fecha</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';

    for (const vendedor in agrupado) {
      const ventasVendedor = agrupado[vendedor];
      ventasVendedor.forEach((venta, idx) => {
        const utilidad = venta.precio_venta - venta.precio_compra;
        totalCompra += venta.precio_compra;
        totalVenta += venta.precio_venta;
        totalUtilidad += utilidad;
        html += '<tr>';
        if (idx === 0) {
          html += \`<td class="border border-gray-300 px-2 py-1 font-semibold" rowspan="\${ventasVendedor.length}">\${vendedor}</td>\`;
        }
        html += \`<td class="border border-gray-300 px-2 py-1">\${venta.nombre}</td>\`;
        html += \`<td class="border border-gray-300 px-2 py-1">$\${venta.precio_compra.toFixed(2)}</td>\`;
        html += \`<td class="border border-gray-300 px-2 py-1">$\${venta.precio_venta.toFixed(2)}</td>\`;
        html += \`<td class="border border-gray-300 px-2 py-1">$\${utilidad.toFixed(2)}</td>\`;
        html += \`<td class="border border-gray-300 px-2 py-1">\${venta.fecha}</td>\`;
        html += '</tr>';
      });
    }

    html += '<tr class="font-bold bg-gray-100">';
    html += '<td class="border border-gray-300 px-2 py-1" colspan="2">Totales</td>';
    html += \`<td class="border border-gray-300 px-2 py-1">$\${totalCompra.toFixed(2)}</td>\`;
    html += \`<td class="border border-gray-300 px-2 py-1">$\${totalVenta.toFixed(2)}</td>\`;
    html += \`<td class="border border-gray-300 px-2 py-1">$\${totalUtilidad.toFixed(2)}</td>\`;
    html += '<td class="border border-gray-300 px-2 py-1"></td>';
    html += '</tr>';

    html += '</tbody></table>';
    return html;
  }

  function generarInforme() {
    const inicio = fechaInicio.value;
    const fin = fechaFin.value;
    if (!inicio || !fin) {
      alert('Por favor, seleccione ambas fechas.');
      return;
    }
    if (inicio > fin) {
      alert('La fecha inicio no puede ser mayor que la fecha fin.');
      return;
    }
    const ventasFiltradas = filtrarVentasPorFecha(inicio, fin);
    const tablaHTML = generarTablaInforme(ventasFiltradas);
    informeContainer.innerHTML = tablaHTML;
  }

  formGenerarInforme.addEventListener('submit', (e) => {
    e.preventDefault();
    generarInforme();
  });

  btnExportarPDF.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'a4',
    });
    const tabla = informeContainer.querySelector('table');
    if (!tabla) {
      alert('No hay informe para exportar. Genere un informe primero.');
      return;
    }
    doc.html(tabla, {
      callback: function (doc) {
        doc.save('informe_ventas.pdf');
      },
      x: 10,
      y: 10,
      html2canvas: { scale: 0.5 },
    });
  });

  btnExportarXLSX.addEventListener('click', () => {
    const tabla = informeContainer.querySelector('table');
    if (!tabla) {
      alert('No hay informe para exportar. Genere un informe primero.');
      return;
    }
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(tabla);
    XLSX.utils.book_append_sheet(wb, ws, 'Informe Ventas');
    XLSX.writeFile(wb, 'informe_ventas.xlsx');
  });

  // Cargar datos iniciales
  cargarProveedores();
  cargarAfiliados();
  cargarInventario();
  cargarVentas();

  // Función para mostrar lista de proveedores para autocompletar
  function mostrarListaProveedores(input, listaElement, proveedoresNombres) {
    const valor = input.value.toLowerCase();
    const filtrados = proveedoresNombres.filter((p) => p.toLowerCase().includes(valor));
    listaElement.innerHTML = '';
    if (filtrados.length === 0 || valor === '') {
      listaElement.classList.add('hidden');
      return;
    }
    filtrados.forEach((p) => {
      const li = document.createElement('li');
      li.textContent = p;
      li.className = 'px-2 py-1 hover:bg-blue-200 cursor-pointer';
      li.addEventListener('click', () => {
        input.value = p;
        listaElement.classList.add('hidden');
      });
      listaElement.appendChild(li);
    });
    listaElement.classList.remove('hidden');
  }
});
