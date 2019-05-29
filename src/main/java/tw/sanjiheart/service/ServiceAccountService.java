package tw.sanjiheart.service;

import java.util.List;

import org.apache.commons.compress.utils.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.kubernetes.client.ApiException;
import io.kubernetes.client.apis.CoreV1Api;
import io.kubernetes.client.models.V1ServiceAccount;
import tw.sanjiheart.model.ResourceList;
import tw.sanjiheart.model.ServiceAccount;
import tw.sanjiheart.utility.ErrorMsg;
import tw.sanjiheart.utility.HttpException;

@Service
public class ServiceAccountService {

  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  @Autowired
  private CoreV1Api api;

  public ResourceList<ServiceAccount> list(String namespace, int itemsPerPage, int page) {
    try {
      int total = 0;
      List<ServiceAccount> serviceAccountList = Lists.newArrayList();
      List<V1ServiceAccount> v1ServiceAccountList = api
          .listNamespacedServiceAccount(namespace, null, "false", null, null, null, null, null, null, null).getItems();
      total = v1ServiceAccountList.size();
      int start = itemsPerPage * (page - 1); // index starts with 0
      int end = start + itemsPerPage - 1;
      end = end > (total - 1) ? total - 1 : end; // end cannot greater than total
      logger.debug("List roles by namespace from {} to {}.", start, end);
      for (int i = start; i <= end; i++) {
        serviceAccountList.add(new ServiceAccount(v1ServiceAccountList.get(i)));
      }
      return new ResourceList<ServiceAccount>(total, serviceAccountList);
    } catch (ApiException e) {
      e.printStackTrace();
      throw new HttpException(ErrorMsg.SERVICE_UNAVAILABLE, e.getMessage());
    }
  }

  public ServiceAccount get(String namespace, String name) {
    try {
      return new ServiceAccount(api.readNamespacedServiceAccount(name, namespace, "false", null, null));
    } catch (ApiException e) {
      e.printStackTrace();
      throw new HttpException(ErrorMsg.SERVICE_UNAVAILABLE, e.getMessage());
    }
  }

}
