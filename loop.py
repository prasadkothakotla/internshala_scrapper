def find_common_items(list1, list2):
    result = []

    for item1 in list1:
        for item2 in list2:
            if item1 == item2:
                result.append(item1)

    return result
n=10
print(n/0)

def calculate_discount(price, discount):
    if discount < 0 or discount > 100:
        raise ValueError("Invalid discount")

    return price * (1 - discount / 100)


price = 100
discount = 20

print(calculate_discount(price, discount))
