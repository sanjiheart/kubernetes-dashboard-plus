package tw.sanjiheart.service;

import java.util.List;

import org.apache.commons.compress.utils.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.kubernetes.client.ApiException;
import io.kubernetes.client.apis.CoreV1Api;
import io.kubernetes.client.models.V1Namespace;
import tw.sanjiheart.model.Namespace;
import tw.sanjiheart.model.ResourceList;
import tw.sanjiheart.utility.ErrorMsg;
import tw.sanjiheart.utility.HttpException;

@Service
public class NamespaceService {

  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  @Autowired
  private CoreV1Api api;

  public ResourceList<Namespace> list(int itemsPerPage, int page) {
    try {
      int total = 0;
      List<Namespace> namespaceList = Lists.newArrayList();
      List<V1Namespace> v1NamespaceList = api.listNamespace(null, "false", null, null, null, null, null, null, null)
          .getItems();
      total = v1NamespaceList.size();
      int start = itemsPerPage * (page - 1); // index starts with 0
      int end = start + itemsPerPage - 1;
      end = end > (total - 1) ? total - 1 : end; // end cannot greater than total
      logger.debug("List namespaces from {} to {}.", start, end);
      for (int i = start; i <= end; i++) {
        namespaceList.add(new Namespace(v1NamespaceList.get(i)));
      }
      return new ResourceList<Namespace>(total, namespaceList);
    } catch (ApiException e) {
      e.printStackTrace();
      throw new HttpException(ErrorMsg.SERVICE_UNAVAILABLE, e.getMessage());
    }
  }

}
