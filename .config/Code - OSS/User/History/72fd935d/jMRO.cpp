#include<iostream>
using namespace std;
typedef struct h {int k;} node;
int main()
{
    node temp[10];
    for(int i=0; i<10; i++) temp[i].k=5-1;
    getw<node> s;
    for(int i=0; i<10; i++) s.insert(temp[i]);
    cout<<("s.begin()).k"<<"\n";
}