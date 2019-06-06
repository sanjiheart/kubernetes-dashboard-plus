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
import tw.sanjiheart.model.RoleBinding;
import tw.sanjiheart.service.RoleBindingService;
import tw.sanjiheart.utility.ErrorMsg;
import tw.sanjiheart.utility.HttpException;

@RestController
public class RoleBindingController implements APIEndpoints {

  @Autowired
  private RoleBindingService roleBindingService;

  @GetMapping(value = NAMESPACES_NAMESPACE_ROLEBINDINGS)
  public ResponseEntity<ResourceList<RoleBinding>> list(@PathVariable String namespace,
      @RequestParam(value = "itemsPerPage", defaultValue = "10") int itemsPerPage,
      @RequestParam(value = "page", defaultValue = "1") int page) {
    if (itemsPerPage < 1 || itemsPerPage > 100) {
      throw new HttpException(ErrorMsg.BAD_REQUEST, "Parameter 'itemsPerPage' must be between 1 to 100.");
    }
    if (page <= 0) {
      throw new HttpException(ErrorMsg.BAD_REQUEST, "Parameter 'page' must be greater than 0.");
    }

    return new ResponseEntity<ResourceList<RoleBinding>>(roleBindingService.list(namespace, itemsPerPage, page),
        HttpStatus.OK);
  }

  @GetMapping(value = NAMESPACES_NAMESPACE_ROLEBINDINGS_NAME)
  public ResponseEntity<RoleBinding> get(@PathVariable String namespace, @PathVariable String name) {
    return new ResponseEntity<RoleBinding>(roleBindingService.get(namespace, name), HttpStatus.OK);
  }

  @DeleteMapping(value = NAMESPACES_NAMESPACE_ROLEBINDINGS_NAME)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable String namespace, @PathVariable String name) {
    roleBindingService.delete(namespace, name);
  }

}
