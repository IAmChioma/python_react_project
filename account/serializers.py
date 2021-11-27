from rest_framework import serializers
from .models import Prefix


def prefix_check(str1, str2):
    result = "";
    n1 = len(str1)
    n2 = len(str2)

    # Compare str1 and str2
    i = 0
    j = 0
    while i <= n1 - 1 and j <= n2 - 1:

        if str1[i] != str2[j]:
            break

        result += str1[i]
        i += 1
        j += 1

    return result


def check_common_prefix(arr):
    n = len(arr)
    prefix = arr[0]

    for i in range(1, n):
        prefix = prefix_check(prefix, arr[i])

    return prefix


class PrefixesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prefix
        fields = ('id','prefix', 'content')
        read_only_fields = ('id',)


class GetPrefixesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Prefix
        fields = ('id','prefix', 'content')


class PrefixSerializer(serializers.Serializer):
    prefix = serializers.ListField(child=serializers.CharField(max_length=200))
    content = serializers.CharField(max_length=200, allow_blank=True, allow_null=True, required=False)
    # class Meta:
    #     model = Prefix
    #     fields = ('id','prefix', 'content')
    #     read_only_fields = ('id',)

    def create(self, validated_data):
        prefix = Prefix()
        prefix.prefix = validated_data['prefix']
        prefix.content = check_common_prefix(validated_data['prefix'])
        prefix.save()
        return prefix

    def update(self, instance, validated_data):
        instance.prefix = validated_data.get('prefix', instance.prefix)
        instance.content = validated_data.get('content', check_common_prefix(instance.prefix))
        instance.save()
        return instance