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

import tw.sanjiheart.model.ClusterRole;
import tw.sanjiheart.model.ResourceList;
import tw.sanjiheart.service.ClusterRoleService;
import tw.sanjiheart.utility.ErrorMsg;
import tw.sanjiheart.utility.HttpException;

@RestController
public class ClusterRoleController implements APIEndpoints {

  @Autowired
  private ClusterRoleService clusterRoleService;

  @GetMapping(value = CLUSTERROLES)
  public ResponseEntity<ResourceList<ClusterRole>> list(
      @RequestParam(value = "itemsPerPage", defaultValue = "10") int itemsPerPage,
      @RequestParam(value = "page", defaultValue = "1") int page) {
    if (itemsPerPage < 1 || itemsPerPage > 100) {
      throw new HttpException(ErrorMsg.BAD_REQUEST, "Parameter 'itemsPerPage' must be between 1 to 100.");
    }
    if (page <= 0) {
      throw new HttpException(ErrorMsg.BAD_REQUEST, "Parameter 'page' must be greater than 0.");
    }

    return new ResponseEntity<ResourceList<ClusterRole>>(clusterRoleService.list(itemsPerPage, page), HttpStatus.OK);
  }

  @GetMapping(value = CLUSTERROLES_NAME)
  public ResponseEntity<ClusterRole> get(@PathVariable String name) {
    return new ResponseEntity<ClusterRole>(clusterRoleService.get(name), HttpStatus.OK);
  }

  @DeleteMapping(value = CLUSTERROLES_NAME)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable String name) {
    clusterRoleService.delete(name);
  }

}
