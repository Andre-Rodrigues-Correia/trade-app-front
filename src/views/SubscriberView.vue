<template>
    <LoadingSpinner v-if="isLoading" />
    <div v-else class="content">

        <div class="default-informations">

        </div>

        <h2>{{ $t('messages.notGroupAccess') }}</h2>

        <p>
            {{ $t('messages.notGroupAccessDescription') }}
        </p>

        <div class="user-informations">
            <h4>{{ $t('users.informations') }}</h4>
            <p>{{ $t('generic.username') }}: {{ userInforations.username }}</p>
        </div>

        <div class="group-informations">

            <h4>{{ $t('groups.informations') }}</h4>
            <p>{{ $t('groups.owner') }}: {{ ownerInformations.phone }}</p>
            <p>{{ $t('groups.mail') }}: {{ ownerInformations.mail }}</p>

            <h3>{{ $t('groups.price') }}: {{ groupInformations?.price ? $t('generic.coin') + " " + parseFloat(groupInformations.price): $t('groups.notPrice') }}</h3>

        </div>


    

    </div>


</template>

<script>
import LoadingSpinner from '@/components/generic/LoadingSpinner.vue';
import gorupService from '@/services/groupService';
import userService from '@/services/userService';

    export default {
        name: 'Subscriber',
        components: {
            LoadingSpinner
        },
        data(){
            return {
                userId: this.$route.params.userId,
                groupId: this.$route.params.groupId,
                groupInformations: {},
                userInforations: {},
                ownerInformations: {},
                isLoading: true,
            }
        },
        created(){
            this.getData();
        },
        methods: {
            async getData(){
                try {
                    this.groupInformations = await gorupService.getGroupById(this.groupId);
                    this.userInforations = await userService.getUserById(this.userId);
                    this.ownerInformations = await await userService.getUserById(this.groupInformations.ownerId);
                    console.log(this.ownerInformations)
                    this.isLoading = false
                } catch (error) {
                    console.error(error.message);
                    alert(this.$t('error.internalServerError'))
                }
            }
        },
    }

</script>


<style>


</style>