export default function (){
	function wSocket(){
		this.stompClient = null;
	}
	wSocket.prototype.connect = function(obj){
		var _this = this;
		var sock = new SockJS('/ws');
		this.stompClient = Stomp.over(sock);
		this.stompClient.connect({}, function() {
			_this.stompClient.subscribe('/ws/repair/0', function(msg) {
				var data = JSON.parse(msg.body)
				if(data.code === 400 || data.code === 401){
					alert(data.msg)
					obj.$router.push("/login")
				}else if(data.code == 0){
					obj.$store.commit('updataHaveToDealNumber',data.data)
					obj.isShow=true
				}
			});
			_this.stompClient.subscribe('/ws/repair/2', function(msg) {
				var data = JSON.parse(msg.body)
				if(data.code === 400 || data.code === 401){
					alert(data.msg)
					obj.$router.push("/login")
				}else if(data.code == 0){
					obj.$store.commit('updataHadConfirmNumber',data.data)
					obj.isShow=true
				}
			});
		});
	}
	wSocket.prototype.disConnect = function(){
		if (this.stompClient != null) {
			this.stompClient.disconnect();
		}
	}
	wSocket.prototype.send = function(){
		if (this.stompClient != null) {
			this.stompClient.send("/send", {}, JSON.stringify({
				'message' : 123
			}));
		}	
	}
	return new wSocket();
}
