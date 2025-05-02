// main.js - Lógica principal para la aplicación Reportar Ventas

document.addEventListener('DOMContentLoaded', () => {
  // Navegación entre secciones
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.section');

  function showSection(sectionId) {
    sections.forEach((section) => {
      section.classList.toggle('hidden', section.id !== sectionId);
    });
    // Actualizar botón activo
    navButtons.forEach((btn) => {
      btn.classList.toggle('bg-blue-200', btn.dataset.section === sectionId);
    });
  }

  // Mostrar sección inicial
  showSection('reportar-venta');

  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      showSection(btn.dataset.section);
    });
  });

  // Funciones para la sección Proveedores
  const formProveedor = document.getElementById('form-proveedor');
  const inputNombreProveedor = document.getElementById('input-nombre-proveedor');
  const listaProveedores = document.getElementById('lista-proveedores');
  const buscarProveedor = document.getElementById('buscar-proveedor');

  let proveedores = JSON.parse(localStorage.getItem('proveedores')) || [];

  function guardarProveedores() {
    localStorage.setItem('proveedores', JSON.stringify(proveedores));
  }

  function renderizarProveedores(filtrados = null) {
    const lista = filtrados || proveedores;
    listaProveedores.innerHTML = '';
    if (lista.length === 0) {
      listaProveedores.innerHTML = '<li class="text-gray-500">No hay proveedores registrados.</li>';
      return;
    }
    lista.forEach((proveedor, index) => {
      const li = document.createElement('li');
      li.className = 'flex justify-between items-center bg-white p-2 rounded shadow-sm';
      li.innerHTML = `
        <span>${proveedor}</span>
        <div class="space-x-2">
          <button class="editar text-blue-600 hover:text-blue-800" data-index="${index}" title="Editar">
            <i class="fas fa-edit"></i>
          </button>
          <button class="eliminar text-red-600 hover:text-red-800" data-index="${index}" title="Eliminar">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;
      listaProveedores.appendChild(li);
    });
  }

  function agregarProveedor(nombre) {
    if (!nombre.trim()) return;
    proveedores.push(nombre.trim());
    guardarProveedores();
    renderizarProveedores();
  }

  function editarProveedor(index, nuevoNombre) {
    if (!nuevoNombre.trim()) return;
    proveedores[index] = nuevoNombre.trim();
    guardarProveedores();
    renderizarProveedores();
  }

  function eliminarProveedor(index) {
    proveedores.splice(index, 1);
    guardarProveedores();
    renderizarProveedores();
  }

  formProveedor.addEventListener('submit', (e) => {
    e.preventDefault();
    agregarProveedor(inputNombreProveedor.value);
    inputNombreProveedor.value = '';
  });

  listaProveedores.addEventListener('click', (e) => {
    if (e.target.closest('button.editar')) {
      const index = e.target.closest('button.editar').dataset.index;
      const nuevoNombre = prompt('Editar nombre del proveedor:', proveedores[index]);
      if (nuevoNombre !== null) {
        editarProveedor(index, nuevoNombre);
      }
    } else if (e.target.closest('button.eliminar')) {
      const index = e.target.closest('button.eliminar').dataset.index;
      if (confirm('¿Está seguro de eliminar este proveedor?')) {
        eliminarProveedor(index);
      }
    }
  });

  buscarProveedor.addEventListener('input', () => {
    const filtro = buscarProveedor.value.toLowerCase();
    const filtrados = proveedores.filter((p) => p.toLowerCase().includes(filtro));
    renderizarProveedores(filtrados);
  });


  // Renderizar proveedores al cargar
  renderizarProveedores();

  // Funciones para la sección Afiliados
  const formAfiliado = document.getElementById('form-afiliado');
  const inputNombreAfiliado = document.getElementById('input-nombre-afiliado');
  const listaAfiliados = document.getElementById('lista-afiliados');
  const buscarAfiliado = document.getElementById('buscar-afiliado');

  let afiliados = JSON.parse(localStorage.getItem('afiliados')) || [];

  function guardarAfiliados() {
    localStorage.setItem('afiliados', JSON.stringify(afiliados));
  }

  function renderizarAfiliados(filtrados = null) {
    const lista = filtrados || afiliados;
    listaAfiliados.innerHTML = '';
    if (lista.length === 0) {
      listaAfiliados.innerHTML = '<li class="text-gray-500">No hay afiliados registrados.</li>';
      return;
    }
    lista.forEach((afiliado, index) => {
      const li = document.createElement('li');
      li.className = 'flex justify-between items-center bg-white p-2 rounded shadow-sm';
      li.innerHTML = `
        <span>${afiliado}</span>
        <div class="space-x-2">
          <button class="editar text-green-600 hover:text-green-800" data-index="${index}" title="Editar">
            <i class="fas fa-edit"></i>
          </button>
          <button class="eliminar text-red-600 hover:text-red-800" data-index="${index}" title="Eliminar">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;
      listaAfiliados.appendChild(li);
    });
  }

  function agregarAfiliado(nombre) {
    if (!nombre.trim()) return;
    afiliados.push(nombre.trim());
    guardarAfiliados();
    renderizarAfiliados();
  }

  function editarAfiliado(index, nuevoNombre) {
    if (!nuevoNombre.trim()) return;
    afiliados[index] = nuevoNombre.trim();
    guardarAfiliados();
    renderizarAfiliados();
  }

  function eliminarAfiliado(index) {
    afiliados.splice(index, 1);
    guardarAfiliados();
    renderizarAfiliados();
  }

  formAfiliado.addEventListener('submit', (e) => {
    e.preventDefault();
    agregarAfiliado(inputNombreAfiliado.value);
    inputNombreAfiliado.value = '';
  });

  listaAfiliados.addEventListener('click', (e) => {
    if (e.target.closest('button.editar')) {
      const index = e.target.closest('button.editar').dataset.index;
      const nuevoNombre = prompt('Editar nombre del afiliado:', afiliados[index]);
      if (nuevoNombre !== null) {
        editarAfiliado(index, nuevoNombre);
      }
    } else if (e.target.closest('button.eliminar')) {
      const index = e.target.closest('button.eliminar').dataset.index;
      if (confirm('¿Está seguro de eliminar este afiliado?')) {
        eliminarAfiliado(index);
      }
    }
  });

  buscarAfiliado.addEventListener('input', () => {
    const filtro = buscarAfiliado.value.toLowerCase();
    const filtrados = afiliados.filter((a) => a.toLowerCase().includes(filtro));
    renderizarAfiliados(filtrados);
  });

  // Renderizar afiliados al cargar
  renderizarAfiliados();

  // Funciones para la sección Inventario
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

  let inventario = JSON.parse(localStorage.getItem('inventario')) || [];

  function guardarInventario() {
    localStorage.setItem('inventario', JSON.stringify(inventario));
  }

  function renderizarInventario(filtrados = null) {
    const lista = filtrados || inventario;
    listaInventario.innerHTML = '';
    if (lista.length === 0) {
      listaInventario.innerHTML = '<li class="text-gray-500">No hay productos en el inventario.</li>';
      return;
    }
    lista.forEach((producto, index) => {
      const li = document.createElement('li');
      li.className = 'flex justify-between items-center bg-white p-2 rounded shadow-sm';
      li.innerHTML = `
        <div>
          <div class="font-semibold">${producto.nombre}</div>
          <div class="text-sm text-gray-600">Compra: $${producto.precioCompra.toFixed(2)} | Venta: $${producto.precioVenta.toFixed(2)}</div>
          <div class="text-sm text-gray-600">Proveedor 1: ${producto.proveedor1} ${producto.proveedor2 ? '| Proveedor 2: ' + producto.proveedor2 : ''}</div>
        </div>
        <div class="space-x-2">
          <button class="editar text-purple-600 hover:text-purple-800" data-index="${index}" title="Editar">
            <i class="fas fa-edit"></i>
          </button>
          <button class="eliminar text-red-600 hover:text-red-800" data-index="${index}" title="Eliminar">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;
      listaInventario.appendChild(li);
    });
  }

  function agregarProducto(producto) {
    inventario.push(producto);
    guardarInventario();
    renderizarInventario();
  }

  function editarProducto(index, producto) {
    inventario[index] = producto;
    guardarInventario();
    renderizarInventario();
  }

  function eliminarProducto(index) {
    inventario.splice(index, 1);
    guardarInventario();
    renderizarInventario();
  }

  // Función para mostrar lista de proveedores para autocompletar
  function mostrarListaProveedores(input, listaElement, proveedores) {
    const valor = input.value.toLowerCase();
    const filtrados = proveedores.filter((p) => p.toLowerCase().includes(valor));
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

  formInventario.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = inputNombreProducto.value.trim();
    const precioCompra = parseFloat(inputPrecioCompra.value);
    const precioVenta = parseFloat(inputPrecioVenta.value);
    const proveedor1 = selectProveedor1.value.trim();
    const proveedor2 = selectProveedor2.value.trim();

    if (!nombre || isNaN(precioCompra) || isNaN(precioVenta) || !proveedor1) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }
    if (precioVenta < precioCompra) {
      alert('El precio de venta no puede ser menor que el precio de compra.');
      return;
    }
    if (!proveedores.includes(proveedor1)) {
      alert('Proveedor 1 no válido.');
      return;
    }
    if (proveedor2 && !proveedores.includes(proveedor2)) {
      alert('Proveedor 2 no válido.');
      return;
    }

    const nuevoProducto = {
      nombre,
      precioCompra,
      precioVenta,
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
      const index = e.target.closest('button.editar').dataset.index;
      const producto = inventario[index];
      const nuevoNombre = prompt('Editar nombre del producto:', producto.nombre);
      if (nuevoNombre === null) return;
      const nuevoPrecioCompra = parseFloat(prompt('Editar precio de compra:', producto.precioCompra));
      if (isNaN(nuevoPrecioCompra)) return alert('Precio de compra inválido.');
      const nuevoPrecioVenta = parseFloat(prompt('Editar precio de venta:', producto.precioVenta));
      if (isNaN(nuevoPrecioVenta)) return alert('Precio de venta inválido.');
      if (nuevoPrecioVenta < nuevoPrecioCompra) return alert('El precio de venta no puede ser menor que el precio de compra.');
      const nuevoProveedor1 = prompt('Editar proveedor 1:', producto.proveedor1);
      if (!nuevoProveedor1 || !proveedores.includes(nuevoProveedor1)) return alert('Proveedor 1 inválido.');
      const nuevoProveedor2 = prompt('Editar proveedor 2 (opcional):', producto.proveedor2 || '');
      if (nuevoProveedor2 && !proveedores.includes(nuevoProveedor2)) return alert('Proveedor 2 inválido.');

      const productoEditado = {
        nombre: nuevoNombre.trim(),
        precioCompra: nuevoPrecioCompra,
        precioVenta: nuevoPrecioVenta,
        proveedor1: nuevoProveedor1.trim(),
        proveedor2: nuevoProveedor2.trim() || null,
      };
      editarProducto(index, productoEditado);
    } else if (e.target.closest('button.eliminar')) {
      const index = e.target.closest('button.eliminar').dataset.index;
      if (confirm('¿Está seguro de eliminar este producto?')) {
        eliminarProducto(index);
      }
    }
  });

  selectProveedor1.addEventListener('input', () => {
    mostrarListaProveedores(selectProveedor1, listaProveedor1, proveedores);
  });

  selectProveedor2.addEventListener('input', () => {
    mostrarListaProveedores(selectProveedor2, listaProveedor2, proveedores);
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

  // Renderizar inventario al cargar
  renderizarInventario();

  // Funciones para la sección Reportar Venta
  const formReportarVenta = document.getElementById('form-reportar-venta');
  const inputAfiliado = document.getElementById('input-afiliado');
  const listaAfiliadosSugeridos = document.getElementById('lista-afiliados-sugeridos');
  const selectProducto = document.getElementById('select-producto');
  const inputFechaVenta = document.getElementById('input-fecha-venta');
  const listaVentas = document.getElementById('lista-ventas');

  let ventas = JSON.parse(localStorage.getItem('ventas')) || [];

  // Función para guardar ventas en localStorage
  function guardarVentas() {
    localStorage.setItem('ventas', JSON.stringify(ventas));
  }

  // Función para renderizar lista de ventas
  function renderizarVentas() {
    listaVentas.innerHTML = '';
    if (ventas.length === 0) {
      listaVentas.innerHTML = '<li class="text-gray-500">No hay ventas reportadas.</li>';
      return;
    }
    ventas.forEach((venta, index) => {
      const li = document.createElement('li');
      li.className = 'flex justify-between items-center bg-white p-2 rounded shadow-sm';
      li.innerHTML = `
        <div>
          <div><span class="font-semibold">Afiliado:</span> ${venta.afiliado}</div>
          <div><span class="font-semibold">Producto:</span> ${venta.producto.nombre}</div>
          <div><span class="font-semibold">Fecha:</span> ${venta.fecha}</div>
        </div>
        <div>
          <button class="eliminar text-red-600 hover:text-red-800" data-index="${index}" title="Eliminar">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;
      listaVentas.appendChild(li);
    });
  }

  // Función para actualizar lista de productos según afiliado seleccionado
  function actualizarProductosPorAfiliado(afiliado) {
    selectProducto.innerHTML = '<option value="">Seleccione un producto</option>';
    if (!afiliado) return;

    // Listar productos según regla:
    // Si afiliado es "GODSPLAN" mostrar productos sin prefijo "AF-"
    // Si otro afiliado, mostrar productos con prefijo "AF-"
    let productosFiltrados = [];
    if (afiliado.toUpperCase() === 'GODSPLAN') {
      productosFiltrados = inventario.filter(p => !p.nombre.startsWith('AF-'));
    } else {
      productosFiltrados = inventario.filter(p => p.nombre.startsWith('AF-'));
    }

    productosFiltrados.forEach((producto, idx) => {
      const option = document.createElement('option');
      option.value = idx;
      option.textContent = producto.nombre;
      selectProducto.appendChild(option);
    });
  }

  // Función para mostrar sugerencias de afiliados mientras se escribe
  function mostrarSugerenciasAfiliados(valor) {
    const filtro = valor.toLowerCase();
    const sugeridos = afiliados
      .filter(a => a.toLowerCase().includes(filtro))
      .sort((a, b) => {
        if (a.toUpperCase() === 'GODSPLAN') return -1;
        if (b.toUpperCase() === 'GODSPLAN') return 1;
        return a.localeCompare(b);
      });
    listaAfiliadosSugeridos.innerHTML = '';
    if (sugeridos.length === 0 || valor === '') {
      listaAfiliadosSugeridos.classList.add('hidden');
      return;
    }
    sugeridos.forEach((a) => {
      const li = document.createElement('li');
      li.textContent = a;
      li.className = 'px-2 py-1 hover:bg-blue-200 cursor-pointer';
      li.addEventListener('click', () => {
        inputAfiliado.value = a;
        listaAfiliadosSugeridos.classList.add('hidden');
        actualizarProductosPorAfiliado(a);
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
    const productoIndex = selectProducto.value;
    const fecha = inputFechaVenta.value;

    if (!afiliado || productoIndex === '' || !fecha) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    if (!afiliados.includes(afiliado)) {
      alert('Afiliado no válido.');
      return;
    }
    const producto = inventario[productoIndex];
    if (!producto) {
      alert('Producto no válido.');
      return;
    }

    const nuevaVenta = {
      afiliado,
      producto,
      fecha,
    };

    ventas.push(nuevaVenta);
    guardarVentas();
    renderizarVentas();

    formReportarVenta.reset();
    selectProducto.innerHTML = '<option value="">Seleccione un producto</option>';
  });

  listaVentas.addEventListener('click', (e) => {
    if (e.target.closest('button.eliminar')) {
      const index = e.target.closest('button.eliminar').dataset.index;
      if (confirm('¿Está seguro de eliminar esta venta?')) {
        ventas.splice(index, 1);
        guardarVentas();
        renderizarVentas();
      }
    }
  });

  // Inicializar fecha con hoy
  const hoyVenta = new Date().toISOString().split('T')[0];
  inputFechaVenta.value = hoyVenta;

  // Renderizar ventas al cargar
  renderizarVentas();

  // Funciones para la sección Generar Informe
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

  // Función para filtrar ventas por rango de fechas
  function filtrarVentasPorFecha(inicio, fin) {
    const inicioDate = new Date(inicio);
    const finDate = new Date(fin);
    return ventas.filter(v => {
      const fechaVenta = new Date(v.fecha);
      return fechaVenta >= inicioDate && fechaVenta <= finDate;
    });
  }

  // Función para agrupar ventas por vendedor (afiliado)
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

  // Función para generar tabla HTML del informe
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
        const utilidad = venta.producto.precioVenta - venta.producto.precioCompra;
        totalCompra += venta.producto.precioCompra;
        totalVenta += venta.producto.precioVenta;
        totalUtilidad += utilidad;
        html += '<tr>';
        if (idx === 0) {
          html += `<td class="border border-gray-300 px-2 py-1 font-semibold" rowspan="${ventasVendedor.length}">${vendedor}</td>`;
        }
        html += `<td class="border border-gray-300 px-2 py-1">${venta.producto.nombre}</td>`;
        html += `<td class="border border-gray-300 px-2 py-1">$${venta.producto.precioCompra.toFixed(2)}</td>`;
        html += `<td class="border border-gray-300 px-2 py-1">$${venta.producto.precioVenta.toFixed(2)}</td>`;
        html += `<td class="border border-gray-300 px-2 py-1">$${utilidad.toFixed(2)}</td>`;
        html += `<td class="border border-gray-300 px-2 py-1">${venta.fecha}</td>`;
        html += '</tr>';
      });
    }

    // Total detallado al final
    html += '<tr class="font-bold bg-gray-100">';
    html += '<td class="border border-gray-300 px-2 py-1" colspan="2">Totales</td>';
    html += `<td class="border border-gray-300 px-2 py-1">$${totalCompra.toFixed(2)}</td>`;
    html += `<td class="border border-gray-300 px-2 py-1">$${totalVenta.toFixed(2)}</td>`;
    html += `<td class="border border-gray-300 px-2 py-1">$${totalUtilidad.toFixed(2)}</td>`;
    html += '<td class="border border-gray-300 px-2 py-1"></td>';
    html += '</tr>';

    html += '</tbody></table>';
    return html;
  }

  // Función para generar informe y mostrarlo
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

  // Función para exportar informe a PDF usando jsPDF
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

  // Función para exportar informe a XLSX usando SheetJS
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
});

  // Funciones para la sección Generar Informe
  const formGenerarInforme = document.getElementById('form-generar-informe');
  const fechaInicio = document.getElementById('fecha-inicio');
  const fechaFin = document.getElementById('fecha-fin');
  const informeContainer = document.getElementById('informe-container');
  const btnExportarPDF = document.getElementById('btn-exportar-pdf');
  const btnExportarXLSX = document.getElementById('btn-exportar-xlsx');

  // Inicializar fechas con valores por defecto
  const hoy = new Date().toISOString().split('T')[0];
  fechaInicio.value = hoy;
  fechaFin.value = hoy;

  // Función para filtrar ventas por rango de fechas
  function filtrarVentasPorFecha(inicio, fin) {
    const inicioDate = new Date(inicio);
    const finDate = new Date(fin);
    return ventas.filter(v => {
      const fechaVenta = new Date(v.fecha);
      return fechaVenta >= inicioDate && fechaVenta <= finDate;
    });
  }

  // Función para agrupar ventas por vendedor (afiliado)
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

  // Función para generar tabla HTML del informe
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
        const utilidad = venta.producto.precioVenta - venta.producto.precioCompra;
        totalCompra += venta.producto.precioCompra;
        totalVenta += venta.producto.precioVenta;
        totalUtilidad += utilidad;
        html += '<tr>';
        if (idx === 0) {
          html += `<td class="border border-gray-300 px-2 py-1 font-semibold" rowspan="${ventasVendedor.length}">${vendedor}</td>`;
        }
        html += `<td class="border border-gray-300 px-2 py-1">${venta.producto.nombre}</td>`;
        html += `<td class="border border-gray-300 px-2 py-1">$${venta.producto.precioCompra.toFixed(2)}</td>`;
        html += `<td class="border border-gray-300 px-2 py-1">$${venta.producto.precioVenta.toFixed(2)}</td>`;
        html += `<td class="border border-gray-300 px-2 py-1">$${utilidad.toFixed(2)}</td>`;
        html += `<td class="border border-gray-300 px-2 py-1">${venta.fecha}</td>`;
        html += '</tr>';
      });
    }

    // Total detallado al final
    html += '<tr class="font-bold bg-gray-100">';
    html += '<td class="border border-gray-300 px-2 py-1" colspan="2">Totales</td>';
    html += `<td class="border border-gray-300 px-2 py-1">$${totalCompra.toFixed(2)}</td>`;
    html += `<td class="border border-gray-300 px-2 py-1">$${totalVenta.toFixed(2)}</td>`;
    html += `<td class="border border-gray-300 px-2 py-1">$${totalUtilidad.toFixed(2)}</td>`;
    html += '<td class="border border-gray-300 px-2 py-1"></td>';
    html += '</tr>';

    html += '</tbody></table>';
    return html;
  }

  // Función para generar informe y mostrarlo
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

  // Función para exportar informe a PDF usando jsPDF
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

  // Función para exportar informe a XLSX usando SheetJS
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
});
