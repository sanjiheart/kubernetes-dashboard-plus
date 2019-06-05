package tw.sanjiheart.service;

import java.util.List;

import org.apache.commons.compress.utils.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.kubernetes.client.ApiException;
import io.kubernetes.client.apis.RbacAuthorizationV1Api;
import io.kubernetes.client.models.V1DeleteOptions;
import io.kubernetes.client.models.V1Role;
import tw.sanjiheart.model.ResourceList;
import tw.sanjiheart.model.Role;
import tw.sanjiheart.utility.ErrorMsg;
import tw.sanjiheart.utility.HttpException;

@Service
public class RoleService {

  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  @Autowired
  private RbacAuthorizationV1Api api;

  public ResourceList<Role> list(String namespace, int itemsPerPage, int page) {
    try {
      int total = 0;
      List<Role> roleList = Lists.newArrayList();
      List<V1Role> v1RoleList = api
          .listNamespacedRole(namespace, null, "false", null, null, null, null, null, null, null).getItems();
      total = v1RoleList.size();
      int start = itemsPerPage * (page - 1); // index starts with 0
      int end = start + itemsPerPage - 1;
      end = end > (total - 1) ? total - 1 : end; // end cannot greater than total
      logger.debug("List roles by namespace from {} to {}.", start, end);
      for (int i = start; i <= end; i++) {
        roleList.add(new Role(v1RoleList.get(i)));
      }
      return new ResourceList<Role>(total, roleList);
    } catch (ApiException e) {
      e.printStackTrace();
      throw new HttpException(ErrorMsg.SERVICE_UNAVAILABLE, e.getMessage());
    }
  }

  public Role get(String namespace, String name) {
    try {
      return new Role(api.readNamespacedRole(name, namespace, "false"));
    } catch (ApiException e) {
      e.printStackTrace();
      throw new HttpException(ErrorMsg.SERVICE_UNAVAILABLE, e.getMessage());
    }
  }

  public void delete(String namespace, String name) {
    try {
      api.deleteNamespacedRole(name, namespace, new V1DeleteOptions(), "false", null, null, null, null);
    } catch (ApiException e) {
      e.printStackTrace();
      throw new HttpException(ErrorMsg.SERVICE_UNAVAILABLE, e.getMessage());
    }
  }

}
