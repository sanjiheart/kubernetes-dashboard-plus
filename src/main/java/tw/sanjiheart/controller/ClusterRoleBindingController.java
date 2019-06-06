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

import tw.sanjiheart.model.ClusterRoleBinding;
import tw.sanjiheart.model.ResourceList;
import tw.sanjiheart.service.ClusterRoleBindingService;
import tw.sanjiheart.utility.ErrorMsg;
import tw.sanjiheart.utility.HttpException;

@RestController
public class ClusterRoleBindingController implements APIEndpoints {

  @Autowired
  private ClusterRoleBindingService clutserRoleBindingService;

  @GetMapping(value = CLUSTERROLEBINDINGS)
  public ResponseEntity<ResourceList<ClusterRoleBinding>> list(
      @RequestParam(value = "itemsPerPage", defaultValue = "10") int itemsPerPage,
      @RequestParam(value = "page", defaultValue = "1") int page) {
    if (itemsPerPage < 1 || itemsPerPage > 100) {
      throw new HttpException(ErrorMsg.BAD_REQUEST, "Parameter 'itemsPerPage' must be between 1 to 100.");
    }
    if (page <= 0) {
      throw new HttpException(ErrorMsg.BAD_REQUEST, "Parameter 'page' must be greater than 0.");
    }

    return new ResponseEntity<ResourceList<ClusterRoleBinding>>(clutserRoleBindingService.list(itemsPerPage, page),
        HttpStatus.OK);
  }

  @GetMapping(value = CLUSTERROLEBINDINGS_NAME)
  public ResponseEntity<ClusterRoleBinding> get(@PathVariable String name) {
    return new ResponseEntity<ClusterRoleBinding>(clutserRoleBindingService.get(name), HttpStatus.OK);
  }

  @DeleteMapping(value = CLUSTERROLEBINDINGS_NAME)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable String name) {
    clutserRoleBindingService.delete(name);
  }

}
