package tw.sanjiheart.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;

import io.kubernetes.client.ApiException;
import io.kubernetes.client.apis.RbacAuthorizationV1Api;
import io.kubernetes.client.models.V1DeleteOptions;
import io.kubernetes.client.models.V1RoleBinding;
import tw.sanjiheart.model.ResourceList;
import tw.sanjiheart.model.RoleBinding;
import tw.sanjiheart.utility.ErrorMsg;
import tw.sanjiheart.utility.HttpException;

@Service
public class RoleBindingService {

  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  @Autowired
  private RbacAuthorizationV1Api api;

  public ResourceList<RoleBinding> list(String namespace, int itemsPerPage, int page) {
    try {
      int total = 0;
      List<RoleBinding> roleBindingList = Lists.newArrayList();
      List<V1RoleBinding> v1RoleBindingList = api
          .listNamespacedRoleBinding(namespace, null, "false", null, null, null, null, null, null, null).getItems();
      total = v1RoleBindingList.size();
      int start = itemsPerPage * (page - 1); // index starts with 0
      int end = start + itemsPerPage - 1;
      end = end > (total - 1) ? total - 1 : end; // end cannot greater than total
      logger.debug("List clusterroles from {} to {}.", start, end);
      for (int i = start; i <= end; i++) {
        roleBindingList.add(new RoleBinding(v1RoleBindingList.get(i)));
      }
      return new ResourceList<RoleBinding>(total, roleBindingList);
    } catch (ApiException e) {
      e.printStackTrace();
      throw new HttpException(ErrorMsg.SERVICE_UNAVAILABLE, e.getMessage());
    }
  }

  public RoleBinding get(String namespace, String name) {
    try {
      return new RoleBinding(api.readNamespacedRoleBinding(name, namespace, "false"));
    } catch (ApiException e) {
      e.printStackTrace();
      throw new HttpException(ErrorMsg.SERVICE_UNAVAILABLE, e.getMessage());
    }
  }

  public void delete(String namespace, String name) {
    try {
      api.deleteNamespacedRoleBinding(name, namespace, new V1DeleteOptions(), "false", null, null, null, null);
    } catch (ApiException e) {
      e.printStackTrace();
      throw new HttpException(ErrorMsg.SERVICE_UNAVAILABLE, e.getMessage());
    }
  }

}
