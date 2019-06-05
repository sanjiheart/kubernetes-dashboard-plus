package tw.sanjiheart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import tw.sanjiheart.model.ResourceList;
import tw.sanjiheart.model.Role;
import tw.sanjiheart.service.RoleService;
import tw.sanjiheart.utility.ErrorMsg;
import tw.sanjiheart.utility.HttpException;

@RestController
public class RoleController implements APIEndpoints {

  @Autowired
  private RoleService roleService;

  @GetMapping(value = NAMESPACES_NAMESPACE_ROLES)
  public ResponseEntity<ResourceList<Role>> list(@PathVariable String namespace,
      @RequestParam(value = "itemsPerPage", defaultValue = "10") int itemsPerPage,
      @RequestParam(value = "page", defaultValue = "1") int page) {
    if (itemsPerPage < 1 || itemsPerPage > 100) {
      throw new HttpException(ErrorMsg.BAD_REQUEST, "Parameter 'itemsPerPage' must be between 1 to 100.");
    }
    if (page <= 0) {
      throw new HttpException(ErrorMsg.BAD_REQUEST, "Parameter 'page' must be greater than 0.");
    }

    return new ResponseEntity<ResourceList<Role>>(roleService.list(namespace, itemsPerPage, page), HttpStatus.OK);
  }

  @GetMapping(value = NAMESPACES_NAMESPACE_ROLES_NAME)
  public ResponseEntity<Role> get(@PathVariable String namespace, @PathVariable String name) {
    return new ResponseEntity<Role>(roleService.get(namespace, name), HttpStatus.OK);
  }

  @DeleteMapping(value = NAMESPACES_NAMESPACE_ROLES_NAME)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable String namespace, @PathVariable String name) {
    roleService.delete(namespace, name);
  }

}
