package tw.sanjiheart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tw.sanjiheart.model.ResourceList;
import tw.sanjiheart.model.ServiceAccount;
import tw.sanjiheart.service.ServiceAccountService;
import tw.sanjiheart.utility.ErrorMsg;
import tw.sanjiheart.utility.HttpException;

@RestController
public class ServiceAccountController {

  @Autowired
  private ServiceAccountService serviceAccountService;

  @GetMapping(value = "/namespaces/{namespace}/serviceaccounts")
  public ResponseEntity<ResourceList<ServiceAccount>> list(@PathVariable String namespace,
      @RequestParam(value = "itemsPerPage", defaultValue = "10") int itemsPerPage,
      @RequestParam(value = "page", defaultValue = "1") int page) {
    if (itemsPerPage < 1 || itemsPerPage > 100) {
      throw new HttpException(ErrorMsg.BAD_REQUEST, "Parameter 'itemsPerPage' must be between 1 to 100.");
    }
    if (page <= 0) {
      throw new HttpException(ErrorMsg.BAD_REQUEST, "Parameter 'page' must be greater than 0.");
    }

    return new ResponseEntity<ResourceList<ServiceAccount>>(serviceAccountService.list(namespace, itemsPerPage, page),
        HttpStatus.OK);
  }

  @GetMapping(value = "/namespaces/{namespace}/serviceaccounts/{name}")
  public ResponseEntity<ServiceAccount> get(@PathVariable String namespace, @PathVariable String name) {
    return new ResponseEntity<ServiceAccount>(serviceAccountService.get(namespace, name), HttpStatus.OK);
  }

}
