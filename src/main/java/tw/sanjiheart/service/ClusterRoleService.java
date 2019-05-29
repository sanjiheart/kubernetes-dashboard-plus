package tw.sanjiheart.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;

import io.kubernetes.client.ApiException;
import io.kubernetes.client.apis.RbacAuthorizationV1Api;
import io.kubernetes.client.models.V1ClusterRole;
import tw.sanjiheart.model.ClusterRole;
import tw.sanjiheart.model.ResourceList;
import tw.sanjiheart.utility.ErrorMsg;
import tw.sanjiheart.utility.HttpException;

@Service
public class ClusterRoleService {

  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  @Autowired
  private RbacAuthorizationV1Api api;

  public ResourceList<ClusterRole> list(int itemsPerPage, int page) {
    try {
      int total = 0;
      List<ClusterRole> clusterRoleList = Lists.newArrayList();
      List<V1ClusterRole> v1ClusterRoleList = api
          .listClusterRole(null, "false", null, null, null, null, null, null, null).getItems();
      total = v1ClusterRoleList.size();
      int start = itemsPerPage * (page - 1); // index starts with 0
      int end = start + itemsPerPage - 1;
      end = end > (total - 1) ? total - 1 : end; // end cannot greater than total
      logger.debug("List clusterroles from {} to {}.", start, end);
      for (int i = start; i <= end; i++) {
        clusterRoleList.add(new ClusterRole(v1ClusterRoleList.get(i)));
      }
      return new ResourceList<ClusterRole>(total, clusterRoleList);
    } catch (ApiException e) {
      e.printStackTrace();
      throw new HttpException(ErrorMsg.SERVICE_UNAVAILABLE, e.getMessage());
    }
  }

  public ClusterRole get(String name) {
    try {
      return new ClusterRole(api.readClusterRole(name, "false"));
    } catch (ApiException e) {
      e.printStackTrace();
      throw new HttpException(ErrorMsg.SERVICE_UNAVAILABLE, e.getMessage());
    }
  }

}
