def find_common_items(list1, list2):
    result = []

    for item1 in list1:
        for item2 in list2:
            if item1 == item2:
                result.append(item1)

    return result
n=10
print(n/0)
