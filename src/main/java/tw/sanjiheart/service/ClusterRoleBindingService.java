package tw.sanjiheart.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;

import io.kubernetes.client.ApiException;
import io.kubernetes.client.apis.RbacAuthorizationV1Api;
import io.kubernetes.client.models.V1ClusterRoleBinding;
import io.kubernetes.client.models.V1DeleteOptions;
import tw.sanjiheart.model.ClusterRoleBinding;
import tw.sanjiheart.model.ResourceList;
import tw.sanjiheart.utility.ErrorMsg;
import tw.sanjiheart.utility.HttpException;

@Service
public class ClusterRoleBindingService {

  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  @Autowired
  private RbacAuthorizationV1Api api;

  public ResourceList<ClusterRoleBinding> list(int itemsPerPage, int page) {
    try {
      int total = 0;
      List<ClusterRoleBinding> clusterRoleBindingList = Lists.newArrayList();
      List<V1ClusterRoleBinding> v1ClusterRoleBindingList = api
          .listClusterRoleBinding(null, "false", null, null, null, null, null, null, null).getItems();
      total = v1ClusterRoleBindingList.size();
      int start = itemsPerPage * (page - 1); // index starts with 0
      int end = start + itemsPerPage - 1;
      end = end > (total - 1) ? total - 1 : end; // end cannot greater than total
      logger.debug("List clusterroles from {} to {}.", start, end);
      for (int i = start; i <= end; i++) {
        clusterRoleBindingList.add(new ClusterRoleBinding(v1ClusterRoleBindingList.get(i)));
      }
      return new ResourceList<ClusterRoleBinding>(total, clusterRoleBindingList);
    } catch (ApiException e) {
      e.printStackTrace();
      throw new HttpException(ErrorMsg.SERVICE_UNAVAILABLE, e.getMessage());
    }
  }

  public ClusterRoleBinding get(String name) {
    try {
      return new ClusterRoleBinding(api.readClusterRoleBinding(name, "false"));
    } catch (ApiException e) {
      e.printStackTrace();
      throw new HttpException(ErrorMsg.SERVICE_UNAVAILABLE, e.getMessage());
    }
  }

  public void delete(String name) {
    try {
      api.deleteClusterRoleBinding(name, new V1DeleteOptions(), "false", null, null, null, null);
    } catch (ApiException e) {
      e.printStackTrace();
      throw new HttpException(ErrorMsg.SERVICE_UNAVAILABLE, e.getMessage());
    }
  }

}
