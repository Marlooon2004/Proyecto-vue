<script setup>
import { ref } from 'vue'

const name_model = ref('')
const last_name_model = ref('')
const id_model = ref('')
const check_model = ref(false)

const personas = ref([])

function agregarEstudiante() {
  // Validación: campos obligatorios
  if (
    name_model.value.trim() === '' ||
    last_name_model.value.trim() === '' ||
    id_model.value.trim() === ''
  ) {
    alert('Por favor, completa todos los campos obligatorios.')
    return
  }

  const nombre = name_model.value.trim()
  const apellidos = last_name_model.value.trim()
  const ci = id_model.value.trim()

  // Validación: nombre y apellidos deben tener más de una letra y no contener números
  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/
  if (!soloLetras.test(nombre) || nombre.length < 2) {
    alert('El nombre debe tener al menos 2 letras y no contener números.')
    return
  }

  if (!soloLetras.test(apellidos) || apellidos.length < 2) {
    alert('Los apellidos deben tener al menos 2 letras y no contener números.')
    return
  }

  // Validación: CI debe tener exactamente 11 dígitos numéricos
  const soloNumeros = /^\d{11}$/
  if (!soloNumeros.test(ci)) {
    alert('El carnet de identidad debe contener exactamente 11 dígitos numéricos sin letras.')
    return
  }

  // Validación: fecha dentro del CI
  const mes = parseInt(ci.slice(2, 4), 10)
  const día = parseInt(ci.slice(4, 6), 10)
  if (mes < 1 || mes > 12 || día < 1 || día > 31) {
    alert('Por favor, verifique el campo de CI')
    return
  }

  // Validación: CI no repetido
  const ciExiste = personas.value.some(p => p.CI === ci)
  if (ciExiste) {
    alert('Ya existe una persona con ese carnet de identidad.')
    return
  }

  personas.value.push({
    Nombre: nombre,
    Apellidos: apellidos,
    CI: ci,
    check: check_model.value,
  })

  // Limpiar formulario
  name_model.value = ''
  last_name_model.value = ''
  id_model.value = ''
  check_model.value = false
}
</script>

<template>
  <div class="contenedor_general">
    <div class="contenedor_izquierdo">
      <h1>Agregar Estudiante</h1>
      <form @submit.prevent="agregarEstudiante" class="bloque_formularios">
        <label for="name">Nombre</label>
        <input type="text" v-model="name_model" class="name" />

        <label for="last_name">Apellidos</label>
        <input type="text" v-model="last_name_model" class="last_name" />

        <label for="id">CI</label>
        <input type="text" v-model="id_model" class="id" />

        <div class="checkbox_group">
          <label for="check">Nuevo ingreso?</label>
          <input type="checkbox" v-model="check_model" class="check" />
        </div>

        <button type="submit">Agregar Estudiante</button>
      </form>
    </div>

    <div class="contenedor_derecho">
      <h2>Listado de Estudiantes</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>CI</th>
            <th>Es nuevo ingreso?</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(persona, index) in personas" :key="index">
            <td>{{ persona.Nombre }}</td>
            <td>{{ persona.Apellidos }}</td>
            <td>{{ persona.CI }}</td>
            <td>{{ persona.check ? 'Sí' : 'No' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
h1,
h2 {
  text-align: center;
}
.contenedor_general {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  flex-wrap: wrap;
}

.contenedor_izquierdo,
.contenedor_derecho {
  flex: 1;
  min-width: 300px;
}

.bloque_formularios {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.checkbox_group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

button {
  margin: 1rem auto; /* margen superior + centrado horizontal */
  padding: 0.5rem 1rem;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 40%;
  display: block; /* necesario para que margin auto funcione */
}

button:hover {
  background-color: #36966f;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th,
td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}

.name,
.last_name,
.check,
.id {
  height: 25px;
}
</style>
