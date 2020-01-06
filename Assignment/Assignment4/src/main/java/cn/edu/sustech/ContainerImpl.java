package cn.edu.sustech;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ContainerImpl implements Container {

    private List<Class> l = new ArrayList<Class>();
    private Map<Class, Class> l2 = new HashMap<Class, Class>();

    @Override
    public <T> void register(Class<T> serviceType) {
        if (serviceType == null || Modifier.isAbstract(serviceType.getModifiers()) || serviceType.getConstructors().length != 1) {
            throw new IllegalArgumentException();
        }
        l.add(serviceType);
    }

    @Override
    public <T> void register(Class<T> serviceType, Class<? extends T> implementationType) {
        if (serviceType == null || implementationType == null || Modifier.isAbstract(implementationType.getModifiers()) || implementationType.isInterface())
            throw new IllegalArgumentException();
        l.add(serviceType);
        l2.put(serviceType, implementationType);
    }

    @Override
    public <T> T resolve(Class<T> serviceType) {
        if (serviceType == null) {
            throw new IllegalArgumentException();
        }
        if (!l.contains(serviceType)) {
            throw new ServiceNotFoundException();
        }
        try {
            Constructor cons;
            if(l2.containsKey(serviceType)) {
                cons = l2.get(serviceType).getConstructors()[0];   //获得实现类的构造函数
            }
            else {
                cons = serviceType.getConstructors()[0];    //获得抽象类的构造函数
            }
            List<Object> parameters = new ArrayList<>();
            for (Class parameter : cons.getParameterTypes()) {
                if (!l.contains(parameter)) {
                    throw new ServiceNotFoundException();
                }
                for (Class c : l) {
                    String cname = c.getTypeName();
                    String pname = parameter.getTypeName();
                    if (cname.equals(pname)) {
                        parameters.add(resolve(c));
                        break;
                    }
                }
            }
            return (T) cons.newInstance(parameters.toArray());
        } catch (IllegalAccessException e) {
            return null;
        } catch (InstantiationException e) {
            return null;
        } catch (InvocationTargetException e) {
            return null;
        }
    }
}
