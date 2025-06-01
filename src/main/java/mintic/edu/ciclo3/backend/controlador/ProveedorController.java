package mintic.edu.ciclo3.backend.controlador;

import java.util.List;
import mintic.edu.ciclo3.backend.modelo.Proveedor;
import mintic.edu.ciclo3.backend.servicio.ProveedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/proveedores") // CORREGIDO
public class ProveedorController {

    @Autowired
    ProveedorService proveedorService;

    // Listar todos los proveedores
    @GetMapping("/list")
    public List<Proveedor> cargarProveedores() {
        return proveedorService.getProveedores();
    }

    // Buscar proveedor por ID
    @GetMapping("/list/{id}")
    public Proveedor buscarPorId(@PathVariable Integer id) {
        return proveedorService.buscarProveedor(id);
    }

    // Agregar proveedor
    @PostMapping("/")
    public Proveedor agregar(@RequestBody Proveedor proveedor) {
        return proveedorService.nuevoProveedor(proveedor);
    }

    // Actualizar proveedor
    @PutMapping("/")
    public Proveedor actualizar(@RequestBody Proveedor proveedor) {
        return proveedorService.nuevoProveedor(proveedor);
    }

    // Eliminar proveedor
    @DeleteMapping("/{id}")
    public ResponseEntity<Proveedor> eliminar(@PathVariable Integer id) {
        Proveedor obj = proveedorService.buscarProveedor(id);
        if (obj != null) {
            proveedorService.borrarProveedor(id);
            return new ResponseEntity<>(obj, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
